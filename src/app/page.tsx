import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            Willkommen bei HelpBaer Prompt Library
          </h1>
          <ThemeToggle />
        </div>
        <p className="text-lg text-muted-foreground">
          Diese Next.js Anwendung ist erfolgreich eingerichtet.
        </p>
      </div>
    </main>
  )
}
