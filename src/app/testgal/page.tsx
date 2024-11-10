'use client';

import { useEffect, useState } from 'react';
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
    Free?: string[];
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

  if (loading) {
    return (
      <div className="min-h-screen p-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className="aspect-square bg-zinc-800 animate-pulse rounded-lg"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {images.map((item) => (
          <div 
            key={item.id} 
            className="group relative border border-zinc-800 rounded-lg overflow-hidden bg-zinc-950 cursor-pointer"
            onClick={() => handleImageClick(item)}
          >
            {/* Status Badge */}
            <div className="absolute top-2 right-2 z-10">
              {item.fields?.Free?.[0] === "true" ? (
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

      {/* Debug Output */}
      <div className="mt-8 p-4 bg-zinc-900 rounded-lg">
        <h3 className="text-lg text-zinc-300 mb-2">Debug: API Response</h3>
        <pre className="text-xs text-zinc-400 overflow-auto max-h-[500px]">
          {JSON.stringify({
            imagesCount: images.length,
            hasMore,
            nextOffset,
            loadingMore
          }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
