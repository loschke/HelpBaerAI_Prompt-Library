"use client"

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { registerSchema } from "@/lib/validations/auth"

function RegisterFormContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    referralCode: searchParams.get('ea') || ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      // Validate form data
      const validatedData = registerSchema.parse(formData)

      // Send request to registration endpoint
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Ein Fehler ist aufgetreten')
      }

      // Redirect to verification page on success
      router.push('/auth/verify-email')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background/30">
      <Card className="w-full max-w-md border-border/50 bg-secondary">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center font-ff-clan">Registrieren</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            {error && (
              <div className="text-sm text-destructive text-center">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium text-foreground">
                Vorname
              </label>
              <Input 
                id="firstName" 
                type="text" 
                required 
                className="bg-background border-input"
                value={formData.firstName}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium text-foreground">
                Nachname
              </label>
              <Input 
                id="lastName" 
                type="text" 
                className="bg-background border-input"
                value={formData.lastName}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                E-Mail-Adresse
              </label>
              <Input 
                id="email" 
                type="email" 
                placeholder="ihre@email.de" 
                required 
                className="bg-background border-input"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Passwort
              </label>
              <Input 
                id="password" 
                type="password" 
                required 
                className="bg-background border-input"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                Passwort bestätigen
              </label>
              <Input 
                id="confirmPassword" 
                type="password" 
                required 
                className="bg-background border-input"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="referralCode" className="text-sm font-medium text-foreground">
                Empfehlungscode
              </label>
              <Input 
                id="referralCode" 
                type="text" 
                required 
                className="bg-background border-input"
                value={formData.referralCode}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? 'Wird registriert...' : 'Registrieren'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center text-sm">
          <p className="text-muted-foreground">
            Bereits registriert?{' '}
            <Link href="/auth/login" className="text-accent hover:text-accent/90 hover:underline">
              Jetzt anmelden
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default function RegisterForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterFormContent />
    </Suspense>
  )
}
