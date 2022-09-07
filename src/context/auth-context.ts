import { createContext } from "react"

export type AuthContextValue = {
  isSignedIn: boolean
  username: string
}

export type AuthContextType = {
  value: AuthContextValue,
  setValue: (value: AuthContextValue) => void
}

export const defaultContextValue: AuthContextValue = {
  isSignedIn: false,
  username: ''
}

export const AuthContext = createContext<AuthContextType | null>(null)
