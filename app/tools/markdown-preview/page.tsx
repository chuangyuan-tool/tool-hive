import ToolShell from '@/components/ToolShell';
import { toolMetadata } from '@/lib/tool-seo';
import MarkdownPreview from '@/components/tools/MarkdownPreview';

export const metadata = toolMetadata('markdown-preview');

export default function Page() {
  return (
    <ToolShell>
      <MarkdownPreview />
    </ToolShell>
  );
}
