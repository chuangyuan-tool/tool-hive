import ToolShell from '@/components/ToolShell';
import { toolMetadata } from '@/lib/tool-seo';
import CssMinifier from '@/components/tools/CssMinifier';

export const metadata = toolMetadata('css-minifier');

export default function Page() {
  return (
    <ToolShell>
      <CssMinifier />
    </ToolShell>
  );
}
