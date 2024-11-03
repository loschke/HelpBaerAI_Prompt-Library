import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MailCheck } from "lucide-react"

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background/30">
      <Card className="w-full max-w-md border-border/50 bg-secondary">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <MailCheck className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center font-ff-clan">
            E-Mail bestätigen
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Wir haben Ihnen einen Bestätigungslink an Ihre E-Mail-Adresse gesendet. Falls Sie keine E-Mail erhalten haben, überprüfen Sie bitte auch Ihren Spam-Ordner.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-foreground">
            Bitte klicke innerhalb von 24h auf den Link in der E-Mail, um dein Konto zu aktivieren.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button 
            variant="outline" 
            className="w-full"
            // TODO: Implement resend functionality
          >
            Bestätigungsmail erneut senden
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            Zurück zur{' '}
            <Link href="/auth/login" className="text-accent hover:text-accent/90 hover:underline">
              Anmeldung
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
