import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background/30">
      <Card className="w-full max-w-md border-border/50 bg-secondary">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center font-ff-clan">Anmelden</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
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
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Einloggen
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center text-sm">
          <p className="text-muted-foreground">
            Noch kein Konto?{' '}
            <Link href="/auth/register" className="text-accent hover:text-accent/90 hover:underline">
              Jetzt registrieren
            </Link>
          </p>
          <p>
            <Link href="/auth/password-reset" className="text-accent hover:text-accent/90 hover:underline">
              Passwort vergessen?
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
