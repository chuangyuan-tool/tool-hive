import ToolShell from '@/components/ToolShell';
import { toolMetadata } from '@/lib/tool-seo';
import SlugGenerator from '@/components/tools/SlugGenerator';

export const metadata = toolMetadata('slug-generator');

export default function Page() {
  return (
    <ToolShell>
      <SlugGenerator />
    </ToolShell>
  );
}
