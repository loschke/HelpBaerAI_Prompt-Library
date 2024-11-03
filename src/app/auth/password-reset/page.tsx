"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function PasswordResetPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/password-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Ein Fehler ist aufgetreten")
      }

      // Redirect to check-email page
      router.push('/auth/password-reset/check-email')
    } catch (error) {
      setError(error instanceof Error ? error.message : "Ein Fehler ist aufgetreten")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background/30">
      <Card className="w-full max-w-md border-border/50 bg-secondary">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center font-ff-clan">
            Passwort zurücksetzen
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Geben Sie Ihre E-Mail-Adresse ein, um Ihr Passwort zurückzusetzen
          </CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="text-sm text-destructive text-center">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Input
                id="email"
                type="email"
                placeholder="E-Mail-Adresse"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Wird verarbeitet..." : "Link anfordern"}
            </Button>
            <Button 
              variant="ghost" 
              className="w-full"
              onClick={() => router.push('/auth/login')}
            >
              Zurück zum Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}


