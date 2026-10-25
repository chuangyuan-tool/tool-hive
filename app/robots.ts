import type { MetadataRoute } from 'next';

const BASE_URL = 'https://toolhive.com.cn';

/**
 * 生成 robots.txt。
 * 之前线上只有 Cloudflare 默认的内容信号文件，没有指向 sitemap 的声明，
 * 爬虫抓完首页就断了线索。
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // 后台/登录/支付回跳页没有可索引内容，别浪费抓取预算
        disallow: [
          '/dashboard',
          '/settings',
          '/payment-pending',
          '/payment-success',
          '/api-key',
          '/login',
          '/register',
          '/signup',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
