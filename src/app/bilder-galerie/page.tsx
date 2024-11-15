import { Metadata } from 'next'
import { GalleryGrid } from "@/components/gallery-grid"

// SEO Metadata
export const metadata: Metadata = {
  title: 'Bilder Galerie | KI-generierte Bilder',
  description: 'Entdecke eine kuratierte Sammlung von KI-generierten Bildern, die mit unseren Promptformeln erstellt wurden.',
  keywords: 'KI Bilder, AI Art, Midjourney, DALL-E, Stable Diffusion, Promptformeln',
}

// Fetch initial data at build time
async function getGalleryImages() {
  try {
    // Use direct Airtable API call for SSR to avoid additional hop through our API
    const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_IMAGES}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`
      },
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    // Filter out records without valid preview images
    const validRecords = result.records.filter((record: any) => 
      record.fields?.Promptvorschau?.[0]?.url
    );

    return {
      images: validRecords,
      nextOffset: result.offset || null
    };
  } catch (err) {
    console.error('Error fetching gallery images:', err);
    return {
      images: [],
      nextOffset: null
    };
  }
}

export default async function BilderGalerie() {
  const { images: initialImages, nextOffset: initialOffset } = await getGalleryImages();

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
          <GalleryGrid 
            initialImages={initialImages} 
            initialOffset={initialOffset}
          />
        </div>
      </div>
    </main>
  )
}
