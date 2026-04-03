import { ROUTES } from "../router/routes"

export function buildLoginLocation(redirectPath: string) {
  return {
    path: ROUTES.login,
    query: {
      redirect: redirectPath
    }
  }
}
