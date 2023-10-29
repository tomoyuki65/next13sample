'use client'
import { useAuthContext } from '@/contexts/AuthContext'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

type Props = {
  mode: string,
  oobCode: string
};

// フォームの入力項目
interface NewPasswordFormInputs {
  password: string;
};

export default function AuthPasswordReset({ mode, oobCode }: Props) {
  const { applyActionCode } = useAuthContext();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<NewPasswordFormInputs>();

  const authPasswordResetSubmit: SubmitHandler<NewPasswordFormInputs> = async (
    formData: NewPasswordFormInputs
  ): Promise<void>  => {
    console.log("デバッグ！！");
    const res = await applyActionCode(mode, oobCode, formData.password, null);
    if (res) {
      toast.success("パスワードを変更しました。");
      router.push("/check");
      return;
    } else {
      toast.error("パスワードを変更できませんでした。");
      router.push("/");
      return;
    };
  };

  return (
    <>
      <h1>パスワード変更用コンポーネント</h1>
      <br />
      <form onSubmit={handleSubmit(authPasswordResetSubmit)}
        className="grid grid-cols-1 gap-10 w-2/3 max-w-lg"
      >
        <div className="flex flex-col">
          <label htmlFor="password">パスワード</label>
          <input id="password" type="password" className="bg-gray-100 rounded h-10"
            {...register('password',{
              required: "新しいパスワードを入力して下さい。",
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
          パスワードを変更する
        </button>
      </form>
      <br />
      <br />
    </>
  )
};