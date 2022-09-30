import { verify } from "jsonwebtoken";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/authContext";
import { ResponseUserInformation } from "../types/ResponseUserInformation";

export const useAuth = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { isAuthenticated, loading, user } = useContext(AuthContext)

  useEffect(() => {
    if ((!session && typeof session !== 'undefined') && !isAuthenticated && !loading && !user) {
     router.push('/')
    }
  }, [session, router, isAuthenticated, loading, user]);

  if (session && !isAuthenticated && !loading) {
    return session.user as ResponseUserInformation
  }

  return user
}
