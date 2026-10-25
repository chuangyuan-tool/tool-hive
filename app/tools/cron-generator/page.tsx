import ToolShell from '@/components/ToolShell';
import { toolMetadata } from '@/lib/tool-seo';
import CronGenerator from '@/components/tools/CronGenerator';

export const metadata = toolMetadata('cron-generator');

export default function Page() {
  return (
    <ToolShell>
      <CronGenerator />
    </ToolShell>
  );
}
