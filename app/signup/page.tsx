'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// /signup 旧入口：静态导出(output:export)下 redirect() 无法生成 301，改用客户端跳转 /register
export default function SignupPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/register');
  }, []);
  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif', color: '#333' }}>
      Redirecting to <a href="/register">/register</a>…
    </div>
  );
}
