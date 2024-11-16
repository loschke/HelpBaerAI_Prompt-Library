import { getAllFaqs, getFaqBySlug } from '../lib/faq';
import Link from 'next/link';

export default async function HomeFaq() {
  const faqs = await getAllFaqs();
  
  // Filter for "allgemein" category (lowercase)
  const allgemeinFaqs = faqs.filter(faq => faq.category === "allgemein");

  // Fetch content for filtered FAQs
  const faqsWithContent = await Promise.all(
    allgemeinFaqs.map(async (faq) => {
      const content = await getFaqBySlug(faq.slug);
      return { ...faq, content };
    })
  );

  if (faqsWithContent.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto max-w-5xl px-4 py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Häufig gestellte Fragen</h2>
      
      <div className="grid gap-4">
        {faqsWithContent.map((faq) => (
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

      <div className="mt-8 text-center">
        <Link 
          href="/faq"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
        >
          Alle FAQs anzeigen
        </Link>
      </div>
    </section>
  );
}
