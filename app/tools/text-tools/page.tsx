import ToolShell from '@/components/ToolShell';
import { toolMetadata } from '@/lib/tool-seo';
import TextTools from '@/components/tools/TextTools';

export const metadata = toolMetadata('text-tools');

export default function Page() {
  return (
    <ToolShell>
      <TextTools />
    </ToolShell>
  );
}
