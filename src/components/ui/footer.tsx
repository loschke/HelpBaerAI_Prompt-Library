import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-background text-primary-foreground mt-auto">
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <span className="text-lg font-bold">PromptBär - AI-Design Bibliothek</span>
                    <p className="text-sm">Eine Kollaboration von <strong>queonext</strong> und <strong>Move:Elevator</strong></p>
                </div>
                <div className="flex space-x-4">
                    <Link 
                        href="https://queonext.de/datenschutz/" 
                        target="_blank" 
                        className="hover:text-primary transition-colors"
                    >
                        Datenschutz
                    </Link>
                    <Link 
                        href="https://www.queo.de/de/agb.html" 
                        target="_blank" 
                        className="hover:text-primary transition-colors"
                    >
                        AGB
                    </Link>
                    <Link 
                        href="https://www.queo.de/de/impressum.html" 
                        target="_blank" 
                        className="hover:text-primary transition-colors"
                    >
                        Impressum
                    </Link>
                </div>
            </div>
        </div>
    </footer>
  )
}
