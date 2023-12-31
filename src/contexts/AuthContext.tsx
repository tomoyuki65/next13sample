/* ユーザー情報共有用のコンテキスト */
'use client'

import { createContext, useContext } from "react"
import useFirebaseAuth, { currentUser } from "@/hooks/useFirebaseAuth"
import { User } from "firebase/auth"

// AuthContextのインターフェース定義
interface AuthContext {
  firebaseUser: User | null;
  currentUser: currentUser | null;
  loading: boolean;
  signupWithEmail: (args: {
    email: string,
    password: string
  }) => Promise<boolean>;
  loginWithEmail: (args: {
    email: string,
    password: string
  }) => Promise<boolean>;
  logout: () => Promise<void>;
  certification:  () => Promise<void>;
  destroyUser: (pasword: string) => Promise<boolean>;
  createSession: () => Promise<void>;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

// ユーザー情報共有用のコンテキスト「AuthCtx」を作成
const AuthCtx = createContext({} as AuthContext);

// ユーザー情報共有用のコンポーネント
export function AuthContextProvider({ children }: AuthProviderProps) {
  // FirebaseAuthの状態を取得
  const {
    firebaseUser,
    currentUser,
    loading,
    signupWithEmail,
    loginWithEmail,
    logout,
    certification,
    destroyUser,
    createSession
  } = useFirebaseAuth();

  // AuthContextオブジェクトの定義
  const AuthContext: AuthContext = {
    firebaseUser: firebaseUser,
    currentUser: currentUser,
    loading: loading,
    signupWithEmail: signupWithEmail,
    loginWithEmail: loginWithEmail,
    logout: logout,
    certification: certification,
    destroyUser: destroyUser,
    createSession: createSession
  };

  return <AuthCtx.Provider value={AuthContext}>{children}</AuthCtx.Provider>;
}

// ユーザー情報共有用の関数
export const useAuthContext = () => useContext(AuthCtx);