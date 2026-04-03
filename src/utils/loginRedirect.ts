export function buildLoginLocation(redirectPath: string) {
  return {
    path: "/login",
    query: {
      redirect: redirectPath
    }
  }
}
