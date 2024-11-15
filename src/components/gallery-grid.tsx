'use client';

import { useState } from 'react';
import { LockOpen, Crown } from "lucide-react";
import { GallerySidePanel } from "@/components/ui/gallery-side-panel";

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

interface GalleryGridProps {
  initialImages: ImageRecord[];
  initialOffset: string | null;
}

export function GalleryGrid({ initialImages, initialOffset }: GalleryGridProps) {
  const [images, setImages] = useState<ImageRecord[]>(initialImages);
  const [selectedImage, setSelectedImage] = useState<ImageRecord | null>(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [showOnlyFree, setShowOnlyFree] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(!!initialOffset);
  const [nextOffset, setNextOffset] = useState<string | null>(initialOffset);
  const [loadedIds] = useState(new Set(initialImages.map(img => img.id)));

  const handleImageClick = (image: ImageRecord) => {
    setSelectedImage(image);
    setIsSidePanelOpen(true);
  };

  const handleCloseSidePanel = () => {
    setIsSidePanelOpen(false);
    setSelectedImage(null);
  };

  const loadMore = async () => {
    if (loadingMore || !nextOffset) return;

    try {
      setLoadingMore(true);
      const response = await fetch(`/api/gallery?offset=${nextOffset}`);
      const result = await response.json();

      if (result.success) {
        // Filter out records without valid preview images and duplicates
        const validRecords = result.data.filter((record: ImageRecord) => 
          record.fields?.Promptvorschau?.[0]?.url && !loadedIds.has(record.id)
        );

        // Add new record IDs to the set
        validRecords.forEach((record: ImageRecord) => loadedIds.add(record.id));

        setImages(prev => [...prev, ...validRecords]);
        setNextOffset(result.nextOffset || null);
        setHasMore(result.hasMore);
      }
    } catch (error) {
      console.error('Error loading more images:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const filteredImages = showOnlyFree 
    ? images.filter(image => image.fields?.Free?.[0] === true)
    : images;

  return (
    <>
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
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Nur FREE Bilder anzeigen
          </span>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-4 px-4">
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
                  alt={`Prompt ${item.fields?.["Prompt ID"] || ''}`}
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

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="px-6 py-2 bg-zinc-800 text-white rounded-md hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingMore ? 'Lädt...' : 'Mehr laden'}
          </button>
        </div>
      )}

      {/* Loading State */}
      {loadingMore && (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4">
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
    </>
  );
}
