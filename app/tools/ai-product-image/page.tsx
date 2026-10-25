import ToolShell from '@/components/ToolShell';
import { toolMetadata } from '@/lib/tool-seo';
import AiProductImage from '@/components/tools/AiProductImage';

export const metadata = toolMetadata('ai-product-image');

export default function Page() {
  return (
    <ToolShell>
      <AiProductImage />
    </ToolShell>
  );
}
