import ToolShell from '@/components/ToolShell';
import { toolMetadata } from '@/lib/tool-seo';
import ColorPicker from '@/components/tools/ColorPicker';

export const metadata = toolMetadata('color-picker');

export default function Page() {
  return (
    <ToolShell>
      <ColorPicker />
    </ToolShell>
  );
}
