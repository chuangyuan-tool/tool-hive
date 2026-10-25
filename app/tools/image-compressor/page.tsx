import ToolShell from '@/components/ToolShell';
import { toolMetadata } from '@/lib/tool-seo';
import ImageCompressor from '@/components/tools/ImageCompressor';

export const metadata = toolMetadata('image-compressor');

export default function Page() {
  return (
    <ToolShell>
      <ImageCompressor />
    </ToolShell>
  );
}
