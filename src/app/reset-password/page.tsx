// 'use client'
// import { useForm, SubmitHandler } from 'react-hook-form'
// import { useAuthContext } from '@/contexts/AuthContext'
// import { useRouter } from 'next/navigation'

// // フォームの入力項目
// interface ResetPasswordFormInputs {
//   email: string;
// };

// export default function ResetPassword() {
//   const { currentUser, loading, resetPassword } = useAuthContext();
//   const router = useRouter();
//   const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormInputs>();

//   // resetPasswordボタンの設定
//   const resetPasswordSubmit: SubmitHandler<ResetPasswordFormInputs> = async (
//     formData: ResetPasswordFormInputs
//   ): Promise<void>  => {
//     const res = await resetPassword(formData.email);
//     if (res) {
//       router.push("/reset-password/finish");
//     } else {
//       router.push("/");
//     };
//   };

//   return (
//     <main className="flex flex-col justify-center items-center w-full h-screen m-auto">
//       <h1 className="text-2xl mb-8 border-b-2 w-2/3 max-w-lg pb-8 text-center">
//         パスワードリセット
//       </h1>
//       <form onSubmit={handleSubmit(resetPasswordSubmit)}
//         className="grid grid-cols-1 gap-10 w-2/3 max-w-lg"
//       >
//         <div className="flex flex-col">
//           <label htmlFor="email">メールアドレス</label>
//           <input id="email" type="email" className="bg-gray-100 rounded h-10"
//             {...register('email',
//               {
//                 required: "メールアドレスを入力して下さい。",
//                 maxLength: { value: 319, message: "319文字以下で入力して下さい。" }
//               })
//             }
//           />
//           <span className="text-red-600">
//             {errors.email && errors.email.message}
//           </span>
//         </div>
//         <button type="submit" className="bg-blue-500 rounded-xl text-white h-10">
//           送信
//         </button>
//       </form>
//     </main>
//   )
// };