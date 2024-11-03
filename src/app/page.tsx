import HeroSection from "@/components/hero-section"
import ConceptSlider from "@/components/concept-slider"
import { getAirtableRecords } from "@/lib/airtable"

export const revalidate = 0;

interface PromptCard {
  id: string;
  fields: {
    name: string;
    free: boolean;
    legend?: string;
    promptFormel?: string;
    referenceImage: {
      url: string;
      thumbnails: {
        small: {
          url: string;
        };
        large: {
          url: string;
        };
      };
    }[];
    examples?: {
      url: string;
      filename: string;
      thumbnails?: {
        small: { url: string; width: number; height: number };
        large: { url: string; width: number; height: number };
      };
    }[];
  };
}

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

  // Ensure records is always an array, even if empty
  const promptCards: PromptCard[] = records || [];

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
        <ConceptSlider cards={promptCards} />
      </div>
    </main>
  )
}
