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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
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
      } finally {
        setIsLoading(false)
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300">Lade Prompt Formeln...</p>
        </div>
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
