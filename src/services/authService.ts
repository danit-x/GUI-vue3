import { BASE_URL } from "./api"

const SIGNUP_USERS_KEY = "auth_signup_users"

export interface LoginResponse {
  accessToken: string
  refreshToken?: string
  token?: string
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  image?: string
}

export interface SignupPayload {
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
}

export interface SignupResponse extends SignupPayload {
  id: number
}

type StoredSignupUser = Pick<SignupResponse, "id" | "username" | "email" | "firstName" | "lastName"> & {
  password: string
}

function getStoredSignupUsers(): StoredSignupUser[] {
  return JSON.parse(localStorage.getItem(SIGNUP_USERS_KEY) || "[]") as StoredSignupUser[]
}

function saveStoredSignupUser(user: StoredSignupUser) {
  const users = getStoredSignupUsers()
  users.push(user)
  localStorage.setItem(SIGNUP_USERS_KEY, JSON.stringify(users))
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 30
      })
    })

    if (response.ok) {
      return response.json()
    }
  } catch (error) {
    console.warn("DummyJSON login request failed, falling back to simulated signup users.", error)
  }

  const matchedUser = getStoredSignupUsers().find(
    (user) => user.username === username && user.password === password
  )

  if (!matchedUser) {
    throw new Error("Login failed")
  }

  return {
    accessToken: `local-demo-token-${matchedUser.id}`,
    id: matchedUser.id,
    username: matchedUser.username,
    email: matchedUser.email,
    firstName: matchedUser.firstName,
    lastName: matchedUser.lastName
  }
}

export async function signup(payload: SignupPayload): Promise<SignupResponse> {
  const response = await fetch(`${BASE_URL}/users/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    throw new Error("Signup failed")
  }

  const createdUser = await response.json() as SignupResponse
  const signupUser = {
    id: createdUser.id,
    username: payload.username,
    email: payload.email,
    firstName: payload.firstName,
    lastName: payload.lastName,
    password: payload.password
  }

  saveStoredSignupUser(signupUser)

  return {
    ...payload,
    id: createdUser.id
  }
}
