'use client'
import { useAuthContext } from '@/contexts/AuthContext'
import { useEffect } from 'react'

export default function ReCertification() {
  const { currentUser, loading, certification } = useAuthContext();

  useEffect(() => {
    if (!currentUser && !loading) {
      certification();
    };
    // 以下のコメント直下のコードのeslintルールを部分的に無効にする
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    </>
  );
};
