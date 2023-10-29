'use client'

export default function AuthVerifyAndChangeEmail() {

  const verifyAndChangeEmailSubmit = async () => {

  };

  return (
    <>
      <h1>メールアドレス変更の認証用コンポーネント</h1>
      <br />
      <p>ボタンを押して認証して下さい。</p>
      <br />
      <button
        className="ml-5 px-2 bg-gray-500 rounded-xl text-white h-10"
        type="submit" onClick={verifyAndChangeEmailSubmit}
      >
        メール変更の認証ボタン
      </button>
      <br />
      <br />
    </>
  )
};