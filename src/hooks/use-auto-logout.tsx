import { useEffect, useRef } from 'react'
import { useAuth } from './use-auth'
import { useToast } from './use-toast'

const AUTO_LOGOUT_TIME = 30 * 60 * 1000 // 30 minutes
const WARNING_TIME = 5 * 60 * 1000 // 5 minutes before logout

export function useAutoLogout() {
  const { user, signOut } = useAuth()
  const { toast } = useToast()
  const timeoutRef = useRef<NodeJS.Timeout>()
  const warningTimeoutRef = useRef<NodeJS.Timeout>()

  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current)
    }

    if (user) {
      // Set warning timer (5 minutes before logout)
      warningTimeoutRef.current = setTimeout(() => {
        toast({
          title: "Peringatan Sesi",
          description: "Sesi Anda akan berakhir dalam 5 menit. Lakukan aktivitas untuk memperpanjang sesi.",
          variant: "destructive",
        })
      }, AUTO_LOGOUT_TIME - WARNING_TIME)

      // Set logout timer
      timeoutRef.current = setTimeout(() => {
        toast({
          title: "Sesi Berakhir",
          description: "Anda telah keluar otomatis karena tidak ada aktivitas.",
          variant: "destructive",
        })
        signOut()
      }, AUTO_LOGOUT_TIME)
    }
  }

  useEffect(() => {
    if (!user) return

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
    
    const resetTimerHandler = () => {
      resetTimer()
    }

    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, resetTimerHandler, true)
    })

    // Initialize timer
    resetTimer()

    return () => {
      // Cleanup
      events.forEach(event => {
        document.removeEventListener(event, resetTimerHandler, true)
      })
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current)
      }
    }
  }, [user])

  return { resetTimer }
}