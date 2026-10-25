import ToolShell from '@/components/ToolShell';
import { toolMetadata } from '@/lib/tool-seo';
import TextDiff from '@/components/tools/TextDiff';

export const metadata = toolMetadata('text-diff');

export default function Page() {
  return (
    <ToolShell>
      <TextDiff />
    </ToolShell>
  );
}
