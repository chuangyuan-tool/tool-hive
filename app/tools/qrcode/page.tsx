import ToolShell from '@/components/ToolShell';
import { toolMetadata } from '@/lib/tool-seo';
import QrCode from '@/components/tools/QrCode';

export const metadata = toolMetadata('qrcode');

export default function Page() {
  return (
    <ToolShell>
      <QrCode />
    </ToolShell>
  );
}
