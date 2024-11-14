import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function VerificationSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background/30">
      <Card className="w-full max-w-md border-border/50 bg-secondary">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center font-ff-clan">Email bestätigt!</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Ihre Email-Adresse wurde erfolgreich verifiziert.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-foreground">
            Sie können sich jetzt mit Ihren Zugangsdaten einloggen.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild className="w-full bg-primary hover:bg-primary/90">
            <Link href="/auth/login">
              Zum Login
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
