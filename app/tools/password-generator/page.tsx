import ToolShell from '@/components/ToolShell';
import { toolMetadata } from '@/lib/tool-seo';
import PasswordGenerator from '@/components/tools/PasswordGenerator';

export const metadata = toolMetadata('password-generator');

export default function Page() {
  return (
    <ToolShell>
      <PasswordGenerator />
    </ToolShell>
  );
}
