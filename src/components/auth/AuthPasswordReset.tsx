'use client'

export default function AuthPasswordReset() {

  const authPasswordResetSubmit = async () => {

  };

  return (
    <>
      <h1>パスワード変更用コンポーネント</h1>
      <br />
      <p>新しいパスワードを入力し、ボタンを押して下さい。</p>
      <br />
      <button
        className="ml-5 px-2 bg-gray-500 rounded-xl text-white h-10"
        type="submit" onClick={authPasswordResetSubmit}
      >
        パスワード変更ボタン
      </button>
      <br />
      <br />
    </>
  )
};