import HeroSection from "@/components/hero-section"
import ConceptSlider from "@/components/concept-slider"
import { getAirtableRecords } from "@/lib/airtable"

export const revalidate = 0;

export default async function Home() {
  const { records, error } = await getAirtableRecords();

  if (error) {
    console.error('Error fetching Airtable records:', error);
    return (
      <main>
        <HeroSection />
        <div className="p-8 text-red-500">
          Failed to load content. Please try again later.
        </div>
      </main>
    );
  }

  return (
    <main>
      <HeroSection />
      <div className="bg-gray-50 dark:bg-zinc-950">
        <div className="pt-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1536px] mx-auto">
            <h2 className="text-6xl text-center mb-16 font-ff-clan italic font-extrabold dark:text-white text-black">
              Unser Promptformeln
            </h2>
          </div>
        </div>
        {Object.entries(records).map(([category, categoryRecords]: [string, any]) => (
          <ConceptSlider 
            key={category}
            title={category}
            cards={categoryRecords}
          />
        ))}
      </div>
    </main>
  )
}
