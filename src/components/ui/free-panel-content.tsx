import Link from 'next/link'
import { StyledMarkdown } from "./styled-markdown"

interface FreePanelContentProps {
  session: any
  markdownContent?: string
  children?: React.ReactNode
}

export function FreePanelContent({ session, markdownContent, children }: FreePanelContentProps) {
  if (session) {
    return markdownContent ? (
      <StyledMarkdown content={markdownContent} />
    ) : (
      children
    )
  }

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-br from-fuchsia-700 to-fuchsia-900 rounded-lg text-white">
        <h3 className="text-2xl font-bold mb-4">
          Kostenlose Prompt-Formeln freischalten
        </h3>
        <ul className="space-y-3 mb-6">
          <li className="flex items-start">
            <svg className="w-6 h-6 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Sofortiger Zugriff auf 16 kostenlose Prompt-Formeln</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Verbessere deine AI-Bildgenerierung</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Kostenlos und ohne versteckte Kosten</span>
          </li>
        </ul>
        <Link 
          href="/auth/register"
          className="block w-full text-center px-6 py-3 bg-white text-fuchsia-700 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
        >
          Jetzt kostenlos registrieren
        </Link>
      </div>
    </div>
  )
}
