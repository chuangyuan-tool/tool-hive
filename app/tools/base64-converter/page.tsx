import ToolShell from '@/components/ToolShell';
import { toolMetadata } from '@/lib/tool-seo';
import Base64Converter from '@/components/tools/Base64Converter';

export const metadata = toolMetadata('base64-converter');

export default function Page() {
  return (
    <ToolShell>
      <Base64Converter />
    </ToolShell>
  );
}
