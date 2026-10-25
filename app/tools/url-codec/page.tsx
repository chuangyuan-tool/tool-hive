import ToolShell from '@/components/ToolShell';
import { toolMetadata } from '@/lib/tool-seo';
import UrlCodec from '@/components/tools/UrlCodec';

export const metadata = toolMetadata('url-codec');

export default function Page() {
  return (
    <ToolShell>
      <UrlCodec />
    </ToolShell>
  );
}
