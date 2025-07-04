"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

type UserContextType = {
  username: string | null
  setUsername: (name: string | null) => void
}

const UserContext = createContext<UserContextType>({
  username: null,
  setUsername: () => {},
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsernameState] = useState<string | null>(null)

  useEffect(() => {
    // Tenta recuperar do localStorage ao carregar
    const storedUsername = localStorage.getItem("username")
    if (storedUsername) {
      setUsernameState(storedUsername)
    }
  }, [])

  const setUsername = (name: string | null) => {
    setUsernameState(name)
    if (name) {
      localStorage.setItem("username", name)
    } else {
      localStorage.removeItem("username")
    }
  }

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
