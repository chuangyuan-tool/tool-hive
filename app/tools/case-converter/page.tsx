import ToolShell from '@/components/ToolShell';
import { toolMetadata } from '@/lib/tool-seo';
import CaseConverter from '@/components/tools/CaseConverter';

export const metadata = toolMetadata('case-converter');

export default function Page() {
  return (
    <ToolShell>
      <CaseConverter />
    </ToolShell>
  );
}
