"use client"

import { useState, useEffect, useCallback } from "react"

// Global volume state
let globalVolume = 50
let globalMuted = false
let globalPreviousVolume = 50
const listeners = new Set<() => void>()

// Helper functions for localStorage
const getStoredVolume = (): number => {
  if (typeof window === "undefined") return 50
  const stored = localStorage.getItem("musicbox-volume")
  return stored ? Number.parseInt(stored, 10) : 50
}

const getStoredMuteState = (): boolean => {
  if (typeof window === "undefined") return false
  const stored = localStorage.getItem("musicbox-muted")
  return stored === "true"
}

const setStoredVolume = (volume: number): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("musicbox-volume", volume.toString())
  }
}

const setStoredMuteState = (muted: boolean): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("musicbox-muted", muted.toString())
  }
}

// Initialize global state from localStorage
if (typeof window !== "undefined") {
  globalVolume = getStoredVolume()
  globalMuted = getStoredMuteState()
  globalPreviousVolume = globalVolume
}

// Notify all listeners of state changes
const notifyListeners = () => {
  listeners.forEach((listener) => listener())
}

export function useGlobalVolume() {
  const [volume, setVolumeState] = useState(globalVolume)
  const [isMuted, setMutedState] = useState(globalMuted)
  const [previousVolume, setPreviousVolumeState] = useState(globalPreviousVolume)

  // Subscribe to global state changes
  useEffect(() => {
    const updateState = () => {
      setVolumeState(globalVolume)
      setMutedState(globalMuted)
      setPreviousVolumeState(globalPreviousVolume)
    }

    listeners.add(updateState)

    return () => {
      listeners.delete(updateState)
    }
  }, [])

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedVolume = getStoredVolume()
    const storedMuted = getStoredMuteState()

    if (globalVolume !== storedVolume || globalMuted !== storedMuted) {
      globalVolume = storedVolume
      globalMuted = storedMuted
      globalPreviousVolume = storedVolume
      notifyListeners()
    }
  }, [])

  const setVolume = useCallback((newVolume: number) => {
    globalVolume = newVolume
    setStoredVolume(newVolume)

    // If volume is changed from 0, unmute
    if (newVolume > 0 && globalMuted) {
      globalMuted = false
      setStoredMuteState(false)
    }

    // If volume is set to 0, mute
    if (newVolume === 0 && !globalMuted) {
      globalMuted = true
      setStoredMuteState(true)
    }

    notifyListeners()
  }, [])

  const setMuted = useCallback((muted: boolean) => {
    if (muted) {
      // Mute: save current volume
      globalPreviousVolume = globalVolume
      globalMuted = true
    } else {
      // Unmute: restore previous volume
      globalMuted = false
      if (globalPreviousVolume === 0) {
        globalVolume = 50
        setStoredVolume(50)
      }
    }

    setStoredMuteState(globalMuted)
    notifyListeners()
  }, [])

  const toggleMute = useCallback(() => {
    setMuted(!globalMuted)
  }, [setMuted])

  return {
    volume,
    isMuted,
    previousVolume,
    setVolume,
    setMuted,
    toggleMute,
  }
}
