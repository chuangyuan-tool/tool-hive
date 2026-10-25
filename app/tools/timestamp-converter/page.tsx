import ToolShell from '@/components/ToolShell';
import { toolMetadata } from '@/lib/tool-seo';
import TimestampConverter from '@/components/tools/TimestampConverter';

export const metadata = toolMetadata('timestamp-converter');

export default function Page() {
  return (
    <ToolShell>
      <TimestampConverter />
    </ToolShell>
  );
}
