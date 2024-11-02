import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MailCheck } from "lucide-react"

export default function CheckEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background/30">
      <Card className="w-full max-w-md border-border/50 bg-secondary">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <MailCheck className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center font-ff-clan">
            E-Mail überprüfen
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Wir haben Ihnen einen Link zum Zurücksetzen des Passworts gesendet
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-foreground">
            Bitte überprüfen Sie Ihren E-Mail-Eingang und klicken Sie auf den Link in der E-Mail, 
            um Ihr Passwort zurückzusetzen.
          </p>
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Hinweis:</strong> Der Link ist 24 Stunden gültig.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            Falls Sie keine E-Mail erhalten haben, überprüfen Sie bitte auch Ihren Spam-Ordner.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button 
            asChild
            variant="outline" 
            className="w-full"
          >
            <Link href="/auth/login">
              Zurück zum Login
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 