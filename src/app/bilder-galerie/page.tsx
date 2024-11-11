'use client';

import { useEffect, useState } from 'react';
import { LockOpen, Crown } from "lucide-react";
import { GallerySidePanel } from "@/components/ui/gallery-side-panel";
import { Badge } from "@/components/ui/badge";
import { LoadingBear } from "@/components/ui/loading-bear";

interface ImageRecord {
  id: string;
  fields: {
    Prompt?: string;
    "Prompt ID"?: number;
    Promptvorschau?: Array<{
      url?: string;
      width?: number;
      height?: number;
    }>;
    Free?: Array<boolean | null>;
    Kategorie?: string[];
  };
}

interface GalleryResponse {
  success: boolean;
  data: ImageRecord[];
  hasMore: boolean;
  nextOffset?: string;
}

export default function TestGallery() {
  const [images, setImages] = useState<ImageRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextOffset, setNextOffset] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageRecord | null>(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [showOnlyFree, setShowOnlyFree] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async (offset?: string) => {
    try {
      const isInitialLoad = !offset;
      isInitialLoad ? setLoading(true) : setLoadingMore(true);

      const url = offset 
        ? `/api/gallery?offset=${offset}`
        : '/api/gallery';

      const response = await fetch(url);
      const result: GalleryResponse = await response.json();
      
      if (result.success) {
        // Filter out records without valid preview images
        const validRecords = result.data.filter(record => 
          record.fields?.Promptvorschau?.[0]?.url
        );
        setImages(prev => isInitialLoad ? validRecords : [...prev, ...validRecords]);
        setNextOffset(result.nextOffset || null);
        setHasMore(result.hasMore);
      } else {
        setError('Failed to load images');
      }
    } catch (err) {
      setError('An error occurred while fetching images');
      console.error('Error:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (nextOffset && !loadingMore) {
      fetchImages(nextOffset);
    }
  };

  const handleImageClick = (image: ImageRecord) => {
    setSelectedImage(image);
    setIsSidePanelOpen(true);
  };

  const handleCloseSidePanel = () => {
    setIsSidePanelOpen(false);
    setSelectedImage(null);
  };

  const filteredImages = showOnlyFree 
    ? images.filter(image => image.fields?.Free?.[0] === true)
    : images;

  if (loading) {
    return <LoadingBear message="Lade Bilder-Galerie..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <main>
      {/* Hero Section */}
      <div className="bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto space-y-8 text-center">
            {/* Tag */}
            <Badge variant="outline" className="border-neutral-500 text-2xl text-neutral-400 hover:bg-accent/10">
              KI-generierte Bilder
            </Badge>

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
          {/* Filter Toggle Button */}
          <div className="w-full px-4 mb-6 relative">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                aria-label={`${showOnlyFree ? 'Hide' : 'Show'} only free images`}
                onClick={() => setShowOnlyFree(!showOnlyFree)}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full
                  ${showOnlyFree ? 'bg-emerald-500' : 'bg-zinc-700'}
                  transition-colors focus:outline-none
                `}
              >
                <span
                  className={`
                    ${showOnlyFree ? 'translate-x-6' : 'translate-x-1'}
                    inline-block h-4 w-4 transform rounded-full bg-white transition
                  `}
                />
              </button>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Nur FREE Bilder anzeigen</span>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-4">
            {filteredImages.map((item) => (
              <div 
                key={item.id} 
                className="group relative border border-zinc-800 rounded-lg overflow-hidden bg-zinc-950 cursor-pointer"
                onClick={() => handleImageClick(item)}
              >
                {/* Status Badge */}
                <div className="absolute top-2 right-2 z-10">
                  {item.fields?.Free?.[0] === true ? (
                    <div className="w-8 h-8 rounded-full bg-zinc-900/80 backdrop-blur-sm flex items-center justify-center">
                      <LockOpen className="w-4 h-4 text-emerald-400" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-zinc-900/80 backdrop-blur-sm flex items-center justify-center">
                      <Crown className="w-4 h-4 text-amber-400" />
                    </div>
                  )}
                </div>

                {/* Image */}
                {item.fields?.Promptvorschau?.[0]?.url && (
                  <div className="aspect-square">
                    <img 
                      src={item.fields.Promptvorschau[0].url} 
                      alt={item.fields?.Prompt || 'Prompt preview'}
                      width={640}
                      height={640}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute bottom-2 left-2">
                  <div className="px-2 py-1 text-xs bg-zinc-800/80 text-zinc-400 rounded-full">
                    {item.fields?.Kategorie?.[0] || 
                     `Prompt ${item.fields?.["Prompt ID"] || 'Unknown'}`}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="px-6 py-2 bg-zinc-800 text-white rounded-md hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingMore ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}

          {loadingMore && (
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div 
                  key={`loading-${i}`} 
                  className="aspect-square bg-zinc-800 animate-pulse rounded-lg"
                />
              ))}
            </div>
          )}

          {/* Side Panel */}
          <GallerySidePanel
            isOpen={isSidePanelOpen}
            onClose={handleCloseSidePanel}
            imageData={selectedImage || undefined}
          />

        </div>
      </div>
    </main>
  );
}
