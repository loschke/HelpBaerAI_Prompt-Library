import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background/30">
      <Card className="w-full max-w-md border-border/50 bg-secondary">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center font-ff-clan text-destructive">
            Authentifizierungsfehler
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Bei der Authentifizierung ist ein Fehler aufgetreten.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-yellow-800">
              <strong>Tipp für Outlook-Nutzer:</strong> Wenn Sie den Link direkt in Outlook angeklickt haben, 
              versuchen Sie stattdessen den Link zu kopieren und direkt in Ihren Browser einzufügen.
            </p>
          </div>
          <p className="text-foreground">
            Mögliche Gründe für diesen Fehler:
          </p>
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
            <li>Der Link ist abgelaufen</li>
            <li>Der Link wurde bereits verwendet</li>
            <li>Die Sitzung ist abgelaufen</li>
            <li>Ungültige Anmeldedaten</li>
          </ul>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center">
          <Button 
            asChild
            className="w-full bg-primary hover:bg-primary/90"
          >
            <Link href="/auth/login">
              Zurück zur Anmeldung
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground">
            Benötigen Sie Hilfe?{" "}
            <Link href="/contact" className="text-accent hover:text-accent/90 hover:underline">
              Kontaktieren Sie uns
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
