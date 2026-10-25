import ToolShell from '@/components/ToolShell';
import { toolMetadata } from '@/lib/tool-seo';
import RegexTester from '@/components/tools/RegexTester';

export const metadata = toolMetadata('regex-tester');

export default function Page() {
  return (
    <ToolShell>
      <RegexTester />
    </ToolShell>
  );
}
