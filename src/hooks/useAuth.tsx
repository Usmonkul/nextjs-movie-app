import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/firebase";
import { useRouter } from "next/router";
import { sign } from "crypto";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const signUp = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setUser(res.user);
        router.push("/");
        setIsLoading(true);
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  };

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setUser(res.user);
        router.push("/");
        setIsLoading(true);
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  };

  const logout = async () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => setUser(null))
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  };
  return {
    error,
    isLoading,
    user,
    signIn,
    signUp,
    logout,
    setUser,
    setIsLoading,
  };
};
