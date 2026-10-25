import ToolShell from '@/components/ToolShell';
import { toolMetadata } from '@/lib/tool-seo';
import UnitConverter from '@/components/tools/UnitConverter';

export const metadata = toolMetadata('unit-converter');

export default function Page() {
  return (
    <ToolShell>
      <UnitConverter />
    </ToolShell>
  );
}
