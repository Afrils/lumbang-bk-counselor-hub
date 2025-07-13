
import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: any | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, fullName: string, role?: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const refreshProfile = async () => {
    if (!user) {
      setProfile(null)
      return
    }
    
    try {
      console.log('Fetching profile for user:', user.id)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle()
      
      if (error) {
        console.error('Error fetching profile:', error)
        throw error
      }
      
      console.log('Profile data:', data)
      setProfile(data)
    } catch (error) {
      console.error('Error refreshing profile:', error)
      setProfile(null)
    }
  }

  useEffect(() => {
    console.log('Setting up auth state listener')
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)
        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          // Use setTimeout to avoid potential recursion
          setTimeout(() => {
            refreshProfile()
          }, 0)
        } else {
          setProfile(null)
        }
        
        setLoading(false)
      }
    )

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error getting session:', error)
      }
      
      console.log('Initial session:', session?.user?.email)
      setSession(session)
      setUser(session?.user ?? null)
      
      if (session?.user) {
        refreshProfile()
      }
      
      setLoading(false)
    })

    return () => {
      console.log('Cleaning up auth subscription')
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting sign in for:', email)
      setLoading(true)
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) {
        console.error('Sign in error:', error)
        toast({
          title: "Error masuk",
          description: error.message,
          variant: "destructive",
        })
      } else {
        console.log('Sign in successful:', data.user?.email)
        toast({
          title: "Berhasil masuk",
          description: "Selamat datang kembali!",
        })
      }
      
      return { error }
    } catch (error) {
      console.error('Sign in exception:', error)
      toast({
        title: "Error masuk",
        description: "Terjadi kesalahan saat masuk",
        variant: "destructive",
      })
      return { error }
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, fullName: string, role = 'siswa') => {
    try {
      console.log('Attempting sign up for:', email, 'with role:', role)
      setLoading(true)
      
      // Get current origin for redirect
      const redirectUrl = typeof window !== 'undefined' ? `${window.location.origin}/` : 'http://localhost:3000/'
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
            role: role
          }
        }
      })
      
      if (error) {
        console.error('Sign up error:', error)
        toast({
          title: "Error mendaftar",
          description: error.message,
          variant: "destructive",
        })
      } else {
        console.log('Sign up successful:', data.user?.email)
        toast({
          title: "Berhasil mendaftar",
          description: "Akun berhasil dibuat. Silakan cek email untuk konfirmasi.",
        })
      }
      
      return { error }
    } catch (error) {
      console.error('Sign up exception:', error)
      toast({
        title: "Error mendaftar",
        description: "Terjadi kesalahan saat mendaftar",
        variant: "destructive",
      })
      return { error }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      console.log('Signing out user')
      await supabase.auth.signOut()
      setUser(null)
      setSession(null)
      setProfile(null)
      toast({
        title: "Berhasil keluar",
        description: "Sampai jumpa lagi!",
      })
    } catch (error) {
      console.error('Sign out error:', error)
      toast({
        title: "Error keluar",
        description: "Terjadi kesalahan saat keluar",
        variant: "destructive",
      })
    }
  }

  const value = {
    user,
    session,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    refreshProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
