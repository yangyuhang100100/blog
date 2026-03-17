import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

function getPostsSidebar() {
  const postsDir = path.resolve(process.cwd(), 'posts')

  if (!fs.existsSync(postsDir)) {
    return []
  }

  const files = fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith('.md') && file !== 'index.md')
    .sort()

  const items = [
    { text: '目录', link: '/posts/' },
    ...files.map((file) => {
      const name = file.replace(/\.md$/, '')
      return {
        text: name,
        link: `/posts/${name}`
      }
    })
  ]

  return [
    {
      text: '学习笔记',
      items
    }
  ]
}

export default defineConfig({
  lang: 'zh-CN',
  title: '小白的知识空间',
  description: '把学习变成作品，把笔记变成能力',
  cleanUrls: true,
  lastUpdated: true,

  themeConfig: {
    siteTitle: '小白的知识空间',

    nav: [
      { text: '学习笔记', link: '/posts/' },
      { text: '作品集', link: '/projects/' },
      { text: '关于我', link: '/about' }
    ],

    sidebar: {
      '/posts/': getPostsSidebar(),
      '/projects/': [
        {
          text: '作品集',
          items: [{ text: '概览', link: '/projects/' }]
        }
      ]
    },

    search: {
      provider: 'local'
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/' }]
  }
})

