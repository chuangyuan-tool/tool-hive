import ToolShell from '@/components/ToolShell';
import { toolMetadata } from '@/lib/tool-seo';
import CsvToJson from '@/components/tools/CsvToJson';

export const metadata = toolMetadata('csv-to-json');

export default function Page() {
  return (
    <ToolShell>
      <CsvToJson />
    </ToolShell>
  );
}
