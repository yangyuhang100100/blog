import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import FloatingWidgets from './components/FloatingWidgets.vue'
import './style.css'

export default {
  ...DefaultTheme,
  Layout: () =>
    h('div', { class: 'vp-layout-with-widgets' }, [
      h(DefaultTheme.Layout),
      h(FloatingWidgets)
    ])
}

