import ToolShell from '@/components/ToolShell';
import { toolMetadata } from '@/lib/tool-seo';
import WordCounter from '@/components/tools/WordCounter';

export const metadata = toolMetadata('word-counter');

export default function Page() {
  return (
    <ToolShell>
      <WordCounter />
    </ToolShell>
  );
}
