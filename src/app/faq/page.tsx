import { getAllFaqs, getFaqBySlug } from '../../lib/faq';
import { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import FullWidthImageStrip from '@/components/full-width-image-strip'

export const metadata: Metadata = {
  title: 'FAQ | HelpBaer AI',
  description: 'Häufig gestellte Fragen zu AI Prompting',
};

export default async function FaqPage() {
  const faqs = await getAllFaqs();
  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  // Fetch all FAQ content upfront
  const faqsWithContent = await Promise.all(
    faqs.map(async (faq) => {
      const content = await getFaqBySlug(faq.slug);
      return { ...faq, content };
    })
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-background text-foreground">
      <div className="bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto space-y-8 text-center">
            <Badge variant="outline" className="border-neutral-500 text-2xl text-neutral-400 hover:bg-accent/10">
              Hilfe & Support
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Häufig gestellte Fragen
            </h1>      

            <p className="text-2xl text-foreground leading-relaxed">
              Hier findest du Antworten auf die wichtigsten Fragen zu KI-Prompting und unseren Services
            </p>
            <Link 
            href="/feedback"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-white bg-accent hover:bg-accent/90 transition-colors duration-200"
          >
            Feedback & Feature-Wünsche
          </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-8 md:py-16">
        
        {categories.map(category => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 capitalize text-white">{category}</h2>
            
            <div className="grid gap-4">
              {faqsWithContent
                .filter(faq => faq.category === category)
                .map((faq) => (
                  <details
                    key={faq.slug}
                    className="group border border-gray-800 rounded-lg bg-zinc-950 backdrop-blur-sm overflow-hidden"
                  >
                    <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-800/50">
                      <h3 className="text-xl font-bold">{faq.title}</h3>
                      <span className="ml-6 flex-shrink-0 text-gray-400">
                        <svg
                          className="w-6 h-6 transform transition-transform group-open:rotate-180"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </span>
                    </summary>
                    <div className="p-6 pt-0">
                      {faq.content && (
                        <div 
                          className="prose prose-lg max-w-none prose-invert prose-p:text-gray-300 prose-headings:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-strong:text-white prose-code:text-blue-300"
                          dangerouslySetInnerHTML={{ __html: faq.content.content }}
                        />
                      )}
                      <div className="mt-4 flex flex-wrap gap-2 pt-4 border-t border-gray-800">
                        {faq.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </details>
                ))}
            </div>
          </div>
        ))}

        {faqs.length === 0 && (
          <p className="text-gray-400 text-center">
            Noch keine FAQ-Einträge vorhanden.
          </p>
        )}
      </div>
      <FullWidthImageStrip />
    </main>
  );
}
