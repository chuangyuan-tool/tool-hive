import ToolShell from '@/components/ToolShell';
import JwtDecoder from '@/components/tools/JwtDecoder';

export default function Page() {
  return (
    <ToolShell>
      <JwtDecoder />
    </ToolShell>
  );
}
