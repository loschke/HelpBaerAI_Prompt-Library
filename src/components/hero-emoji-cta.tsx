import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Wand2 } from "lucide-react"

export default function HeroEmojiCta() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto space-y-8 text-center">
          {/* Tag */}
          <Badge variant="outline" className="border-neutral-500 text-2xl text-neutral-400 hover:bg-accent/10">
            AI-Design | Prompt Bibliothek
          </Badge>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            <span className="text-primary">Von</span> "Wie formuliere ich das?" <span className="text-primary"> zu</span>  "Wow, genau das Bild wollte ich!"
          </h1>      

          {/* Description */}
          <p className="text-2xl text-foreground leading-relaxed">
            Tschüss Trial & Error, hallo Durchblick! Mit unserer Prompt-Bibliothek verwandelst du deine  Gedanken in kristallklare Prompts. Mit unseren 80+ erprobten Promptformeln und 1.000+ Beispielen kriegst du genau die Bilder, die du dir vorstellst. Und das Beste? Du musst nicht erst drei Semester "Fortgeschrittenes Prompten" studieren.
          </p>

          {/* Emoji Progress */}
          <div className="flex items-center justify-center gap-2 text-3xl md:text-4xl">
            <span role="img" aria-label="Confused face">😕</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <span role="img" aria-label="Thinking face">🤔</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <span role="img" aria-label="Lightbulb">💡</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <span role="img" aria-label="Star-struck face">🤩</span>
          </div>             

          {/* CTA Button */}
          <Button size="lg" className="px-8 py-6 text-xl">
            <Wand2 className="mr-2 h-5 w-5" />
            Starte kostenlos mit 15 Prompt-Formeln
          </Button>
        </div>
      </div>
    </div>
  )
}
