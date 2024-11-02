import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function NewPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background/30">
      <Card className="w-full max-w-md border-border/50 bg-secondary">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center font-ff-clan">Neues Passwort festlegen</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Bitte geben Sie Ihr neues Passwort ein.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Neues Passwort
              </label>
              <Input 
                id="password" 
                type="password" 
                required 
                className="bg-background border-input"
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
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Passwort ändern
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center text-sm">
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
