"use client"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { useContext, createContext } from "react"
import { AuthDocument } from "./graphql/Auth.graphql"
import { useLoginMutation } from "./graphql/Login.graphql"
import { useRouter } from "next/navigation"
import { useLogoutMutation } from "./graphql/Logout.graphql"

type AuthProps = {
  user: any
  login: {
    login: (email: string, password: string) => Promise<void>
    data: any
    error: any
    loading: boolean
  }
  logout: {
    logout: () => Promise<void>
    data: any
    error: any
    loading: boolean
  }
  refetchAuth: () => Promise<any>
  authCookie: string
  authParams: any
}

const AuthContext = createContext<Partial<AuthProps>>({ user: null })

export function AuthProvider({ children, cookie }) {
  const authParams = {
    errrorPolicy: "ignore",
    // context: {
    //   headers: {
    //     cookie,
    //   },
    // },
  }

  const {
    data,
    client,
    refetch: refetchAuth,
  } = useSuspenseQuery<any>(AuthDocument, {
    errorPolicy: "ignore",
    // context: {
    //   headers: cookie
    //     ? {
    //         cookie,
    //       }
    //     : {},
    // },
  })

  const user = data && data.auth ? { ...data.auth } : null

  const [
    loginMutation,
    { data: loginData, error: loginError, loading: loginLoading },
  ] = useLoginMutation()
  const [
    logoutMutation,
    { loading: logoutLoading, data: logoutData, error: logoutError },
  ] = useLogoutMutation()
  const router = useRouter()

  const login = async (email: string, password: string) => {
    await loginMutation({
      variables: { input: { email, password } },
    })
    await client.resetStore()

    // router.push("/user/dashboard")
  }

  const logout = async () => {
    await logoutMutation()
    await client.resetStore()
  }

  const auth = {
    authCookie: cookie,
    user,
    login: { login, data: loginData, error: loginError, loading: loginLoading },
    logout: {
      logout,
      data: logoutData,
      error: logoutError,
      loading: logoutLoading,
    },
    refetchAuth,
    authParams,
  }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
