import { defineConfig } from 'vitepress'

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
      '/posts/': [
        {
          text: '学习笔记',
          items: [
            { text: '目录', link: '/posts/' },
            { text: '今天学了什么', link: '/posts/01-今天学了什么' }
          ]
        }
      ],
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

