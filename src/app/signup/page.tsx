'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAuthContext } from '@/contexts/AuthContext'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// フォームの入力項目
interface SignupFormInputs {
  email: string;
  password: string;
};

export default function Signup() {
  const { currentUser, loading, signupWithEmail } = useAuthContext();
  const router = useRouter();

  // ログイン済みの場合はHomeへ飛ばす
  useEffect(() => {
    if (!loading && currentUser) {
      router.push("/");
    }
    // 以下のコメント直下のコードのeslintルールを部分的に無効にする
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, loading]);

  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>();

  // Signupボタンの設定
  const signup: SubmitHandler<SignupFormInputs> = (formData) => {
    // console.log(formData);
    const email = formData.email;
    const password = formData.password;
    signupWithEmail({email, password});
  };

  return (
    <main className="flex flex-col justify-center items-center w-full h-screen m-auto">
      <h1 className="text-2xl mb-8 border-b-2 w-2/3 max-w-lg pb-8 text-center">
        Signup
      </h1>
      <form onSubmit={handleSubmit(signup)}
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
          Signup
        </button>
      </form>
    </main>
  )
}