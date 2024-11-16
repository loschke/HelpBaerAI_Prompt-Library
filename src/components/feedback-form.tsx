'use client';

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Image from 'next/image'
import type { FeedbackType } from '@/lib/email'

type FormData = {
  name: string
  email: string | null
  feedbackType: FeedbackType | ''
  description: string
  privacyAccepted: boolean
  sessionEmail: string | null
}

export default function FeedbackForm() {
  const router = useRouter()
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    feedbackType: '',
    description: '',
    privacyAccepted: false,
    sessionEmail: null
  })

  useEffect(() => {
    if (session?.user?.email) {
      const userEmail = session.user.email || null
      setFormData(prev => ({
        ...prev,
        sessionEmail: userEmail,
        email: userEmail
      }))
    }
  }, [session])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  const handleSelectChange = (value: FeedbackType) => {
    setFormData(prev => ({
      ...prev,
      feedbackType: value
    }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      privacyAccepted: checked
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!formData.feedbackType || !formData.description || !formData.privacyAccepted) {
      setError('Bitte füllen Sie alle Pflichtfelder aus')
      return
    }

    if (!session?.user?.email && !formData.email) {
      setError('Bitte geben Sie eine E-Mail-Adresse an')
      return
    }

    setError(null)
    setIsLoading(true)

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Ein Fehler ist aufgetreten')
      }

      router.push('/feedback/success')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center bg-background/30">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2">
        {/* Left Column - Benefits */}
        <div className="hidden md:flex md:flex-col bg-gradient-to-bl from-accent to-accent/90 text-white rounded-l-lg overflow-hidden">
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <Image
              src="/images/promptbaer_contact_16-9.webp"
              alt="Promptbaer Feedback"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div className="p-8 flex-1">
            <h1 className="text-3xl font-bold mb-8 font-ff-clan">Feedback & Feature-Wünsche</h1>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <svg className="w-6 h-6 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h2 className="font-semibold text-xl mb-2">Direkte Einflussnahme</h2>
                  <p className="text-white/90">Wir nehmen dein Feedback ernst und prüfen jeden Vorschlag für neue Features oder Verbesserungen sorgfältig.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <svg className="w-6 h-6 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h2 className="font-semibold text-xl mb-2">Gemeinsame Entwicklung</h2>
                  <p className="text-white/90">Als Community entwickeln wir PromptBär stetig weiter und setzen regelmäßig neue Features um.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Feedback Form */}
        <div className="bg-secondary p-8 rounded-r-lg">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-center font-ff-clan">Feedback Formular</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-sm text-destructive text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Name (optional)
              </label>
              <Input
                id="name"
                className="bg-background border-input"
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                E-Mail {!session?.user?.email && '*'}
              </label>
              <Input
                id="email"
                type="email"
                className="bg-background border-input"
                value={formData.email || ''}
                onChange={handleChange}
                disabled={isLoading || !!session?.user?.email}
                required={!session?.user?.email}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Feedback-Typ*
              </label>
              <Select value={formData.feedbackType} onValueChange={handleSelectChange}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Bitte wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="feature">Feature-Wunsch</SelectItem>
                  <SelectItem value="bug">Fehlermeldung</SelectItem>
                  <SelectItem value="improvement">Verbesserungsvorschlag</SelectItem>
                  <SelectItem value="general">Allgemeines Feedback</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-foreground">
                Beschreibung*
              </label>
              <Textarea
                id="description"
                className="bg-background border-input min-h-[160px]"
                value={formData.description}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="privacyAccepted"
                checked={formData.privacyAccepted}
                onCheckedChange={handleCheckboxChange}
              />
              <label htmlFor="privacyAccepted" className="text-sm text-muted-foreground">
                Ich stimme zu, dass meine Daten verarbeitet werden. Weitere Informationen in der <a href="/privacy" className="text-primary hover:underline">Datenschutzerklärung</a>.
              </label>
            </div>

            <Button
              type="submit"
              variant="default"
              className="w-full bg-fuchsia-800 hover:bg-fuchsia-900"
              disabled={isLoading}
            >
              {isLoading ? 'Wird gesendet...' : 'Feedback senden'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
