import { Metadata } from 'next'
import { GalleryGrid } from "@/components/gallery-grid"

// SEO Metadata
export const metadata: Metadata = {
  title: 'Bilder Galerie | KI-generierte Bilder',
  description: 'Entdecke eine kuratierte Sammlung von KI-generierten Bildern, die mit unseren Promptformeln erstellt wurden.',
  keywords: 'KI Bilder, AI Art, Midjourney, DALL-E, Stable Diffusion, Promptformeln',
}

// Fetch data at build time with revalidation
async function getGalleryImages() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    const response = await fetch(`${baseUrl}/api/gallery`, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    // Filter out records without valid preview images
    return data.data.filter((record: any) => 
      record.fields?.Promptvorschau?.[0]?.url
    );
  } catch (err) {
    console.error('Error fetching gallery images:', err);
    return [];
  }
}

export default async function BilderGalerie() {
  const initialImages = await getGalleryImages();

  return (
    <main>
      {/* Hero Section */}
      <div className="bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto space-y-8 text-center">
            {/* Tag */}
            <div className="border-neutral-500 text-2xl text-neutral-400 hover:bg-accent/10 inline-flex border rounded-full px-4 py-1">
              KI-generierte Bilder
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Bilder Galerie
            </h1>      

            {/* Description */}
            <p className="text-2xl text-foreground leading-relaxed">
              Entdecke eine kuratierte Sammlung von KI-generierten Bildern, die mit unseren Promptformeln erstellt wurden.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-gray-50 dark:bg-zinc-950">
        <div className="w-full mx-auto py-8">
          <GalleryGrid initialImages={initialImages} />
        </div>
      </div>
    </main>
  )
}
