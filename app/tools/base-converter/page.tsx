import ToolShell from '@/components/ToolShell';
import { toolMetadata } from '@/lib/tool-seo';
import BaseConverter from '@/components/tools/BaseConverter';

export const metadata = toolMetadata('base-converter');

export default function Page() {
  return (
    <ToolShell>
      <BaseConverter />
    </ToolShell>
  );
}
