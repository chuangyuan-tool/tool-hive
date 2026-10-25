import ToolShell from '@/components/ToolShell';
import { toolMetadata } from '@/lib/tool-seo';
import NumberBase from '@/components/tools/NumberBase';

export const metadata = toolMetadata('number-base');

export default function Page() {
  return (
    <ToolShell>
      <NumberBase />
    </ToolShell>
  );
}
