import ToolShell from '@/components/ToolShell';
import { toolMetadata } from '@/lib/tool-seo';
import DataConvert from '@/components/tools/DataConvert';

export const metadata = toolMetadata('data-convert');

export default function Page() {
  return (
    <ToolShell>
      <DataConvert />
    </ToolShell>
  );
}
