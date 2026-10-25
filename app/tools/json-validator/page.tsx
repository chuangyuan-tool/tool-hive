import ToolShell from '@/components/ToolShell';
import { toolMetadata } from '@/lib/tool-seo';
import JsonValidator from '@/components/tools/JsonValidator';

export const metadata = toolMetadata('json-validator');

export default function Page() {
  return (
    <ToolShell>
      <JsonValidator />
    </ToolShell>
  );
}
