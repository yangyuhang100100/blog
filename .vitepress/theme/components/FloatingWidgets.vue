<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vitepress'

const progress = ref(0)
const showBackTop = ref(false)
const route = useRoute()
const readingChars = ref(0)
const readingMinutes = ref(1)
let rafId = 0
let idleTimer: number | undefined
const isScrolling = ref(false)

const quotes = [
  '持续记录，复利会在未来某天突然可见。',
  '先完成，再完美；先发布，再优化。',
  '每一篇笔记，都是给未来自己的路标。',
  '学习最怕中断，最贵的是长期主义。',
  '做一个小而稳的改进，也值得庆祝。'
]

const currentQuote = ref(quotes[0])

const progressStyle = computed(() => ({ width: `${progress.value}%` }))
const showReadingMeta = computed(() => route.path !== '/')
const showQuote = computed(() => route.path === '/')
const progressText = computed(() => `${Math.round(progress.value)}%`)
const showProgressLabel = computed(() => showReadingMeta.value && isScrolling.value)
const readingMetaText = computed(
  () => `本文 ${readingChars.value.toLocaleString('zh-CN')} 字 · 预计 ${readingMinutes.value} 分钟`
)

function syncReadingModeClass() {
  if (typeof document === 'undefined') return
  const isReadingPage = route.path !== '/'
  document.documentElement.classList.toggle('reading-mode', isReadingPage)
}

function pickQuote() {
  const next = quotes[Math.floor(Math.random() * quotes.length)]
  currentQuote.value = next
}

function updateProgress() {
  const doc = document.documentElement
  const scrollTop = doc.scrollTop || document.body.scrollTop
  const article = document.querySelector('.VPDoc .vp-doc') as HTMLElement | null

  if (article) {
    const articleTop = article.offsetTop
    const articleBottom = articleTop + article.offsetHeight
    const viewportHeight = window.innerHeight || doc.clientHeight
    const start = Math.max(0, articleTop - 100)
    const end = Math.max(start + 1, articleBottom - viewportHeight * 0.35)
    const ratio = Math.max(0, Math.min(100, ((scrollTop - start) / (end - start)) * 100))

    progress.value = ratio
  } else {
    const scrollHeight = doc.scrollHeight - doc.clientHeight
    const ratio = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0
    progress.value = Math.max(0, Math.min(100, ratio))
  }

  showBackTop.value = scrollTop > 240
}

function scheduleUpdateProgress() {
  isScrolling.value = true
  if (idleTimer) window.clearTimeout(idleTimer)
  idleTimer = window.setTimeout(() => {
    isScrolling.value = false
  }, 900)

  if (rafId) return
  rafId = window.requestAnimationFrame(() => {
    rafId = 0
    updateProgress()
  })
}

function updateReadingMeta() {
  const root = document.querySelector('.vp-doc')
  if (!root) {
    readingChars.value = 0
    readingMinutes.value = 1
    return
  }

  const text = (root.textContent || '').replace(/\s+/g, '')
  const chars = text.length
  // 按中文阅读速度约 320 字/分钟估算，最低 1 分钟。
  const minutes = Math.max(1, Math.ceil(chars / 320))
  readingChars.value = chars
  readingMinutes.value = minutes
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  pickQuote()
  syncReadingModeClass()
  updateProgress()
  nextTick(updateReadingMeta)
  window.addEventListener('scroll', scheduleUpdateProgress, { passive: true })
  window.addEventListener('resize', scheduleUpdateProgress, { passive: true })
})

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.remove('reading-mode')
  }
  window.removeEventListener('scroll', scheduleUpdateProgress)
  window.removeEventListener('resize', scheduleUpdateProgress)
  if (idleTimer) {
    window.clearTimeout(idleTimer)
    idleTimer = undefined
  }
  if (rafId) {
    window.cancelAnimationFrame(rafId)
    rafId = 0
  }
})

watch(
  () => route.path,
  async () => {
    syncReadingModeClass()
    await nextTick()
    updateProgress()
    updateReadingMeta()
  }
)
</script>

<template>
  <div class="floating-widgets" :class="{ 'is-scrolling': isScrolling }" aria-hidden="false">
    <div class="reading-progress">
      <div class="reading-progress__bar" :style="progressStyle" />
      <span v-show="showProgressLabel" class="reading-progress__label">{{ progressText }}</span>
    </div>

    <div class="widgets-panel">
      <div v-if="showReadingMeta && readingChars > 0" class="widget-meta">
        {{ readingMetaText }}
      </div>

      <button
        v-if="showQuote"
        class="widget-btn widget-btn--quote"
        type="button"
        @click="pickQuote"
        title="换一句"
      >
        {{ currentQuote }}
      </button>

      <button
        v-show="showBackTop"
        class="widget-btn widget-btn--top"
        type="button"
        @click="scrollToTop"
        title="回到顶部"
      >
        ↑ 顶部
      </button>
    </div>
  </div>
</template>
