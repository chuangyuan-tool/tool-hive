import ToolShell from '@/components/ToolShell';
import { toolMetadata } from '@/lib/tool-seo';
import LoremIpsum from '@/components/tools/LoremIpsum';

export const metadata = toolMetadata('lorem-ipsum');

export default function Page() {
  return (
    <ToolShell>
      <LoremIpsum />
    </ToolShell>
  );
}
