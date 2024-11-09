import Link from 'next/link'
import { StyledMarkdown } from "./styled-markdown"

interface PremiumPanelContentProps {
  session: any
  markdownContent?: string
  children?: React.ReactNode
}

export function PremiumPanelContent({ session, markdownContent, children }: PremiumPanelContentProps) {
  // If user is logged in and has premium/partner/team subscription, show content
  if (session?.user?.subscriptionTier && session.user.subscriptionTier !== 'FREE') {
    return markdownContent ? (
      <StyledMarkdown content={markdownContent} />
    ) : (
      children
    )
  }

  // Premium promotion panel (shown for both non-logged in and free users)
  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg text-white">
        <h3 className="text-2xl font-bold mb-4">
          Premium Prompt-Formeln freischalten
        </h3>
        <ul className="space-y-3 mb-6">
          <li className="flex items-start">
            <svg className="w-6 h-6 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Zugriff auf alle Premium Prompt-Formeln</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Professionelle Prompt-Formeln für fortgeschrittene Anwendungen</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Regelmäßige Updates mit neuen Formeln</span>
          </li>
        </ul>
        <Link 
          href={session ? "/premium" : "/auth/register"}
          className="block w-full text-center px-6 py-3 bg-white text-amber-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
        >
          {session ? "Jetzt Premium werden" : "Jetzt registrieren"}
        </Link>
      </div>
    </div>
  )
}
