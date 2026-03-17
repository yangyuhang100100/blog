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

  head: [
    [
      'script',
      { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }
    ],
    [
      'script',
      {},
      `
;(function () {
  var pathname = window.location.pathname || '/';
  var hash = window.location.hash || '';
  var search = window.location.search || '';

  var params = new URLSearchParams(search);
  var invite = params.get('invite_token');
  var recovery = params.get('recovery_token');

  var tokenHash = hash;
  if (!tokenHash) {
    if (invite) tokenHash = '#invite_token=' + encodeURIComponent(invite);
    else if (recovery) tokenHash = '#recovery_token=' + encodeURIComponent(recovery);
  }

  if (!tokenHash) return;
  if (tokenHash.indexOf('invite_token=') === -1 && tokenHash.indexOf('recovery_token=') === -1) return;

  // 若已经在 /admin/，只做 hash 规范化（把 ?token 转成 #token），避免死循环
  if (pathname.indexOf('/admin') === 0) {
    if (!hash && tokenHash) {
      window.history.replaceState(null, '', pathname + tokenHash);
    }
    return;
  }

  window.location.replace('/admin/' + tokenHash);
})();
      `
    ]
  ],

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

