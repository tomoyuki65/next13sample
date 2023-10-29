'use client'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuthContext } from '@/contexts/AuthContext'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

// フォームの入力項目
interface LoginFormInputs {
  email: string;
  password: string;
};

export default function Login() {
  const { currentUser, loading, loginWithEmail } = useAuthContext();
  const router = useRouter();

  // ログイン済みの場合はTopページへ飛ばす
  useEffect(() => {
    if (currentUser && currentUser.emailVerified == true) {
      router.push("/");
    }
    // 以下のコメント直下のコードのeslintルールを部分的に無効にする
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  // Loginボタンの設定
  const loginSubmit: SubmitHandler<LoginFormInputs> = async (formData) => {
    const email = formData.email;
    const password = formData.password;
    const res = await loginWithEmail({ email, password });

    if (res) {
      router.push("/check/certification");
    } else {
      toast.error("Loginできませんでした。");
      router.push("/login");
    };
  };

  return (
    <main className="flex flex-col justify-center items-center w-full h-screen m-auto">
      <h1 className="text-2xl mb-8 border-b-2 w-2/3 max-w-lg pb-8 text-center">
        Login
      </h1>
      <form onSubmit={handleSubmit(loginSubmit)}
        className="grid grid-cols-1 gap-10 w-2/3 max-w-lg"
      >
        <div className="flex flex-col">
          <label htmlFor="email">メールアドレス</label>
          <input id="email" type="email" className="bg-gray-100 rounded h-10"
            {...register('email',
              {
                required: "メールアドレスを入力して下さい。",
                maxLength: { value: 319, message: "319文字以下で入力して下さい。" }
              })
            }
          />
          <span className="text-red-600">
            {errors.email && errors.email.message}
          </span>
        </div>
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
          Login
        </button>
      </form>
    </main>
  )
}