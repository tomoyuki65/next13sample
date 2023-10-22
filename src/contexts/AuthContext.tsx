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
  signupWithEmail: (arg: {
    email: string,
    password: string
  }) => Promise<void>;
  loginWithEmail: (arg: {
    email: string,
    password: string
  }) => Promise<void>;
  logout: () => Promise<void>;
  destroyUser: (user: User) => Promise<void>;
  getIdToken: () => Promise<string | undefined>;
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
    destroyUser,
    getIdToken
  } = useFirebaseAuth();

  // AuthContextオブジェクトの定義
  const AuthContext: AuthContext = {
    firebaseUser: firebaseUser,
    currentUser: currentUser,
    loading: loading,
    signupWithEmail: signupWithEmail,
    loginWithEmail: loginWithEmail,
    logout: logout,
    destroyUser: destroyUser,
    getIdToken: getIdToken
  };

  return <AuthCtx.Provider value={AuthContext}>{children}</AuthCtx.Provider>;
}

// ユーザー情報共有用の関数
export const useAuthContext = () => useContext(AuthCtx);