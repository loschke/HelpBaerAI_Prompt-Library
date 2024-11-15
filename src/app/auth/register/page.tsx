"use client"

import { useState, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
      const validatedData = registerSchema.parse(formData)
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Ein Fehler ist aufgetreten')
      }

      router.push('/auth/verify-email')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background/30">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2">
        {/* Left Column - Benefits */}
        <div className="hidden md:flex md:flex-col bg-gradient-to-bl from-fuchsia-700 to-fuchsia-900 text-white rounded-l-lg overflow-hidden">
          {/* Image Container */}
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}> {/* 16:9 aspect ratio */}
            <Image
              src="/images/promptbaer_action_16-9.webp"
              alt="HelpBaer AI"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Content Container */}
          <div className="p-8 flex-1">
            <h2 className="text-3xl font-bold mb-8 font-ff-clan">Sofort starten mit PromptBär</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <svg className="w-6 h-6 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="font-semibold text-xl mb-2">16 Kostenlose Prompt-Formeln</h3>
                  <p className="text-white/90">Starte sofort mit professionellen Prompt-Formeln für deine AI-Bildgenerierung</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <svg className="w-6 h-6 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Verbesserte Bildqualität</h3>
                  <p className="text-white/90">Erstelle hochwertige AI-Bilder mit optimierten Prompt-Formeln</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <svg className="w-6 h-6 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Kostenlos starten</h3>
                  <p className="text-white/90">Keine versteckten Kosten oder Verpflichtungen</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Registration Form */}
        <div className="bg-secondary p-8 rounded-r-lg">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-center font-ff-clan">Registrieren</h2>
          </div>
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
              className="w-full bg-fuchsia-800 hover:bg-fuchsia-900"
              disabled={isLoading}
            >
              {isLoading ? 'Wird registriert...' : 'Registrieren'}
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              Bereits registriert?{' '}
              <Link href="/auth/login" className="text-white hover:text-primary">
                Jetzt anmelden
              </Link>
            </div>
          </form>
        </div>
      </div>
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
