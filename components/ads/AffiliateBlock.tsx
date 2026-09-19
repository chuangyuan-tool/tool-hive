'use client';

type AffiliateBlockProps = {
  enabled?: boolean;
  title?: string;
  body?: string;
  cta?: string;
  href?: string;
};

// 联盟推荐位（Affiliate）：以后推某个工具/云服务商/SaaS 时用它。
// 填上 title + href(你的专属 affiliate 链接) 即显示；缺关键项则不渲染。
export default function AffiliateBlock({
  enabled = true,
  title,
  body,
  cta,
  href,
}: AffiliateBlockProps) {
  if (!enabled || !title || !href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="block border border-dashed border-gray-300 rounded-xl p-4 my-4 hover:bg-gray-50 transition-colors"
    >
      <div className="text-sm font-semibold text-gray-800">{title}</div>
      {body ? <p className="text-sm text-gray-600 mt-1">{body}</p> : null}
      {cta ? <span className="inline-block mt-2 text-sm font-medium text-blue-600">{cta} →</span> : null}
    </a>
  );
}
