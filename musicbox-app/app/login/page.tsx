import Link from "next/link"
import { Music } from "lucide-react"
import { LoginForm } from "@/components/login-form"
import { AnimatedGradientText } from "@/components/animated-gradient-text"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Music className="h-8 w-8 text-blue-400 dark:text-blue-300" />
            <span className="text-2xl font-bold">
              <AnimatedGradientText>MusicBox</AnimatedGradientText>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
          <p className="text-muted-foreground mt-2">Sign in to your account to continue your music journey</p>
        </div>
        <LoginForm />
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
