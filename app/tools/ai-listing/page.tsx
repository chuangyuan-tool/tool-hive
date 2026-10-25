import ToolShell from '@/components/ToolShell';
import { toolMetadata } from '@/lib/tool-seo';
import AiListing from '@/components/tools/AiListing';

export const metadata = toolMetadata('ai-listing');

export default function Page() {
  return (
    <ToolShell>
      <AiListing />
    </ToolShell>
  );
}
