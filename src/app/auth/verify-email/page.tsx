import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background/30">
      <Card className="w-full max-w-md border-border/50 bg-secondary">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center font-ff-clan">E-Mail bestätigen</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Wir haben Ihnen einen Bestätigungslink an Ihre E-Mail-Adresse gesendet.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-foreground">
            Bitte klicken Sie auf den Link in der E-Mail, um Ihr Konto zu aktivieren.
          </p>
          <p className="text-sm text-muted-foreground">
            Falls Sie keine E-Mail erhalten haben, überprüfen Sie bitte auch Ihren Spam-Ordner.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center text-sm">
          <Button 
            variant="outline" 
            className="w-full"
          >
            Bestätigungsmail erneut senden
          </Button>
          <p className="text-muted-foreground">
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
