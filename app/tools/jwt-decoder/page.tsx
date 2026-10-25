import ToolShell from '@/components/ToolShell';
import { toolMetadata } from '@/lib/tool-seo';
import JwtDecoder from '@/components/tools/JwtDecoder';

export const metadata = toolMetadata('jwt-decoder');

export default function Page() {
  return (
    <ToolShell>
      <JwtDecoder />
    </ToolShell>
  );
}
