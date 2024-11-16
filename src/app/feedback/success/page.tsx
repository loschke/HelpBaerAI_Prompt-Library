import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircle } from 'lucide-react'

export default function FeedbackSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background/30">
      <Card className="w-full max-w-md border-border/50 bg-secondary">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center font-ff-clan">
            Feedback gesendet!
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Vielen Dank für dein Feedback.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-foreground">
              Wir werden dein Feedback sorgfältig prüfen und bei der Weiterentwicklung von PromptBär berücksichtigen.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild className="w-full">
            <Link href="/">
              Zur Startseite
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
