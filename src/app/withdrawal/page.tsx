'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAuthContext } from '@/contexts/AuthContext'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

// フォームの入力項目
interface WithdrawalFormInputs {
  password: string;
};

export default function Withdrawal() {
  const { currentUser, loading, destroyUser } = useAuthContext();
  const router = useRouter();

  // 未ログインの場合はTopページへ飛ばす
  useEffect(() => {
    if (!currentUser && !loading) {
      router.push("/");
    };
    // 以下のコメント直下のコードのeslintルールを部分的に無効にする
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm<WithdrawalFormInputs>();

  // withdrawalボタンの設定
  const withdrawal: SubmitHandler<WithdrawalFormInputs> = async (formData) => {
    const password = formData.password;
    const res = await destroyUser(password);

    if (res) {
      toast.success("退会しました。");
      router.push("/");
    } else {
      toast.error("退会処理に失敗しました。");
      router.push("/check/certification");
    };
  };

  return (
    <main className="flex flex-col justify-center items-center w-full h-screen m-auto">
      <h1 className="text-2xl mb-8 border-b-2 w-2/3 max-w-lg pb-8 text-center">
        退会ページ
      </h1>
      <form onSubmit={handleSubmit(withdrawal)}
        className="grid grid-cols-1 gap-10 w-2/3 max-w-lg"
      >
        <div className="flex flex-col">
          <label htmlFor="password">パスワード</label>
          <input id="password" type="password" className="bg-gray-100 rounded h-10"
            {...register('password',{
              required: "パスワードを入力して下さい。",
              minLength: { value: 6, message: "6文字以上で入力して下さい。" },
              maxLength: { value: 128, message: "128文字以下で入力して下さい。" }
              })
            }
          />
          <span className="text-red-600">
            {errors.password && errors.password.message}
          </span>
        </div>

        <button type="submit" className="bg-blue-500 rounded-xl text-white h-10">
          退会する
        </button>
      </form>
    </main>
  )
}