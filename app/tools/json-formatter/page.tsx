import ToolShell from '@/components/ToolShell';
import { toolMetadata } from '@/lib/tool-seo';
import JsonFormatter from '@/components/tools/JsonFormatter';

export const metadata = toolMetadata('json-formatter');

export default function Page() {
  return (
    <ToolShell>
      <JsonFormatter />
    </ToolShell>
  );
}
