"use client"

import { useState, Suspense } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea" // Diese Komponente müssen wir noch erstellen
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

function ContactFormContent() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    contact: '',
    message: '',
    privacyAccepted: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      contact: value
    }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      privacyAccepted: checked
    }))
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Ein Fehler ist aufgetreten')
      }

      router.push('/contact/success')
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
        <div className="hidden md:flex md:flex-col bg-gradient-to-bl from-accent to-accent/90 text-white rounded-l-lg overflow-hidden">
          {/* Image Container */}
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <Image
              src="/images/promptbaer_contact_16-9.png"
              alt="HelpBaer AI"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Content Container */}
          <div className="p-8 flex-1">
            <h2 className="text-3xl font-bold mb-8 font-ff-clan">Kontaktiere uns</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <svg className="w-6 h-6 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Wir freuen uns auf deine Nachricht</h3>
                  <p className="text-white/90">Hast du Fragen zu unserer Prompt Bibliothek oder möchtest du mehr über PromptBär erfahren? Wir sind für dich da!</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <svg className="w-6 h-6 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Persönliche Betreuung</h3>
                  <p className="text-white/90">Falls du bereits mit einem unserer Ansprechpartner in Kontakt standest, wähle diesen bitte im Formular aus. So können wir dein Anliegen optimal betreuen.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <svg className="w-6 h-6 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Schnelle Antwort</h3>
                  <p className="text-white/90">Wir melden uns zeitnah bei dir zurück und finden gemeinsam die beste Lösung für deine Anforderungen.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="bg-secondary p-8 rounded-r-lg">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-center font-ff-clan">Kontaktformular</h2>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            {error && (
              <div className="text-sm text-destructive text-center">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium text-foreground">
                Vorname*
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
              <label htmlFor="company" className="text-sm font-medium text-foreground">
                Firma
              </label>
              <Input 
                id="company" 
                type="text" 
                className="bg-background border-input"
                value={formData.company}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                E-Mail-Adresse*
              </label>
              <Input 
                id="email" 
                type="email" 
                required 
                className="bg-background border-input"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Ansprechpartner
              </label>
              <Select onValueChange={handleSelectChange} value={formData.contact}>
                <SelectTrigger>
                  <SelectValue placeholder="Bitte wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="queonext">queonext - Rico Loschke</SelectItem>
                  <SelectItem value="moveelevator">MoveElevator - Hans Piechatzek</SelectItem>
                  <SelectItem value="general">Egal - Allgemeine Frage</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground">
                Nachricht
              </label>
              <Textarea 
                id="message" 
                className="bg-background border-input min-h-[100px]"
                value={formData.message}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox 
                id="privacy" 
                required
                onCheckedChange={handleCheckboxChange}
              />
              <label htmlFor="privacy" className="text-sm text-muted-foreground">
                Ich stimme zu, dass meine Angaben zur Kontaktaufnahme und für Rückfragen gespeichert werden. Weitere Informationen finden Sie in der <a href="https://queonext.de/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</a>.
              </label>
            </div>

            <Button 
              type="submit" 
              variant="default" 
              className="w-full bg-fuchsia-800 hover:bg-fuchsia-900"
              disabled={isLoading}
            >
              {isLoading ? 'Wird gesendet...' : 'Nachricht senden'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function ContactForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactFormContent />
    </Suspense>
  )
} 