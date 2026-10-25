import ToolShell from '@/components/ToolShell';
import { toolMetadata } from '@/lib/tool-seo';
import HashCalculator from '@/components/tools/HashCalculator';

export const metadata = toolMetadata('hash-calculator');

export default function Page() {
  return (
    <ToolShell>
      <HashCalculator />
    </ToolShell>
  );
}
