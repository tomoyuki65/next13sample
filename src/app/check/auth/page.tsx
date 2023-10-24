'use client'
import AuthEmailVerification from '@/components/auth/AuthEmailVerification'
import AuthPasswordReset from '@/components/auth/AuthPasswordReset'
import AuthVerifyAndChangeEmail from '@/components/auth/AuthVerifyAndChangeEmail'
import { useSearchParams } from 'next/navigation'
// import { authAdmin } from '@/libs/firebaseAdminConfig'

export default function CheckAuth() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const oobCode = String(searchParams.get("oobCode"));

  if (!searchParams.get("oobCode")) {
    // リダイレクト処理
    console.log("oobCodeがありません！");
  };

  // Firebaseメールアクションのタイプチェック
  const modeTypes = [
    "verifyEmail",
    "resetPassword",
    "C"
  ];
  let result = false;
  for (let i = 0; i < modeTypes.length; i++) {
    if (modeTypes[i] === mode) {
      result = true;
      break;
    };
  };
  if (!result) {
    // リダイレクト処理
    console.log("不正なURLです！");
  };

  // Aは承認ボタン
  // Bはパスワード入力画面
  // Cは承認ボタン
  return (
      <>
          <h1>Auth用のチェックページ</h1>
          <br />
          { mode == "verifyEmail" && <AuthEmailVerification oobCode={oobCode} /> }
          { mode == "resetPassword" && <AuthPasswordReset /> }
          { mode == "C" && <AuthVerifyAndChangeEmail /> }
      </>
  )
};