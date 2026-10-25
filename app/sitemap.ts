import type { MetadataRoute } from 'next';
import { toolSeo } from '@/lib/tool-seo';

const BASE_URL = 'https://toolhive.com.cn';

/**
 * 动态生成 sitemap.xml。
 *
 * 之前线上 /sitemap.xml 返回 404，搜索引擎只能靠外链慢慢发现页面。
 * 这里只收「已上架」的工具页（toolSeo 里 live: true），储备池工具不进 sitemap，
 * 避免把 30 个半成品页面一起推给 Google 稀释权重。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/tools`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms-of-service`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const toolPages: MetadataRoute.Sitemap = Object.entries(toolSeo)
    .filter(([, entry]) => entry.live)
    .map(([slug]) => ({
      url: `${BASE_URL}/tools/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  return [...staticPages, ...toolPages];
}
