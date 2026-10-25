import ToolShell from '@/components/ToolShell';
import { toolMetadata } from '@/lib/tool-seo';
import UuidGenerator from '@/components/tools/UuidGenerator';

export const metadata = toolMetadata('uuid-generator');

export default function Page() {
  return (
    <ToolShell>
      <UuidGenerator />
    </ToolShell>
  );
}
