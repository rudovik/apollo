import { cookies } from "next/headers"

export const getCookies = () => {
  let cookieValue = ""
  const cookieStore = cookies()
  const requestCookies = cookieStore.getAll()
  requestCookies.forEach((cookie) => {
    cookieValue += cookie.name + "=" + cookie.value + ";"
  })

  return cookieValue
}
