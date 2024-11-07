'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import ConceptSlider from "@/components/concept-slider"

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

export default function PromptFormeln() {
  const { data: session, status } = useSession()
  const [promptCards, setPromptCards] = useState<PromptCard[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/airtable');
        const data = await response.json();
        
        if (data.error) {
          setError('Failed to load content. Please try again later.');
          console.error('Error fetching Airtable records:', data.error);
        } else {
          setPromptCards(data.records || []);
        }
      } catch (err) {
        setError('Failed to load content. Please try again later.');
        console.error('Error fetching Airtable records:', err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="p-8 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <main>
      <div className="bg-gray-50 dark:bg-zinc-950">
        <div className="pt-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1536px] mx-auto">
            <h2 className="text-6xl text-center mb-16 font-ff-clan italic font-extrabold dark:text-white text-black">
              Prompt Formeln
            </h2>
          </div>
        </div>
        <ConceptSlider cards={promptCards} session={session} />
      </div>
    </main>
  )
}
