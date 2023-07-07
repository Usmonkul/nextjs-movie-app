import { auth } from "@/firebase/firebase";
import { useAuth } from "@/hooks/useAuth";
import { User, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
interface AuthContextState {
  user: User | null;
  error: string;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextState>({
  user: null,
  error: "",
  isLoading: false,
  signIn: async () => {},
  signUp: async () => {},
  logout: async () => {},
});
const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [initialLoader, setInitialLoader] = useState<boolean>(true);
  const {
    error,
    isLoading,
    user,
    signIn,
    signUp,
    logout,
    setUser,
    setIsLoading,
  } = useAuth();
  const router = useRouter();
  const value = useMemo(
    () => ({ error, isLoading, logout, signIn, signUp, user }),
    // eslint-disable-next-line
    [user, isLoading, error]
  );
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
        setIsLoading(false);
        setInitialLoader(false);
      }),
    //eslint-disable-next-line
    []
  );
  return (
    <AuthContext.Provider value={value}>
      {!initialLoader ? children : null}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
