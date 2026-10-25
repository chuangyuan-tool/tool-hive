import ToolShell from '@/components/ToolShell';
import { toolMetadata } from '@/lib/tool-seo';
import EcomAutomation from '@/components/tools/EcomAutomation';

export const metadata = toolMetadata('ecom-automation');

export default function Page() {
  return (
    <ToolShell>
      <EcomAutomation />
    </ToolShell>
  );
}
