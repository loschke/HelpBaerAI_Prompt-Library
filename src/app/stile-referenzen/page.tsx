"use client"

import { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { LoadingBear } from "@/components/ui/loading-bear";

interface StyleRecord {
  id: string;
  fields: {
    ID?: string;
    Preview?: Array<{
      url?: string;
      width?: number;
      height?: number;
    }>;
    ImgSamples?: Array<{
      url?: string;
      width?: number;
      height?: number;
    }>;
    StyleValue?: string;
    Platform?: string;
    StyleType?: string;
  };
}

interface StylesResponse {
  success: boolean;
  data: StyleRecord[];
  hasMore: boolean;
  nextOffset?: string;
}

export default function StylesReferencesPage() {
  const [styles, setStyles] = useState<StyleRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextOffset, setNextOffset] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchStyles();
  }, []);

  const fetchStyles = async (offset?: string) => {
    try {
      const isInitialLoad = !offset;
      isInitialLoad ? setLoading(true) : setLoadingMore(true);

      const url = offset 
        ? `/api/styles?offset=${offset}`
        : '/api/styles';

      const response = await fetch(url);
      const result: StylesResponse = await response.json();
      
      if (result.success) {
        setStyles(prev => isInitialLoad ? result.data : [...prev, ...result.data]);
        setNextOffset(result.nextOffset || null);
        setHasMore(result.hasMore);
      } else {
        setError('Failed to load styles');
      }
    } catch (err) {
      setError('An error occurred while fetching styles');
      console.error('Error:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (nextOffset && !loadingMore) {
      fetchStyles(nextOffset);
    }
  };

  if (loading) {
    return <LoadingBear message="Lade Stile..." />;
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
              Kreative Inspiration
            </Badge>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Bildstile & Referenzen
            </h1>      

            {/* Description */}
            <p className="text-2xl text-foreground leading-relaxed">
              Von klassischen Kunstrichtungen bis hin zu modernen Designstilen - finde die perfekte Inspiration für deine kreativen Projekte.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-gray-50 dark:bg-zinc-950">
        <div className="w-full mx-auto py-8">
          {/* Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4">
            {styles.map((style) => (
              <div 
                key={style.id} 
                className="group relative border border-zinc-800 rounded-lg overflow-hidden bg-zinc-950"
              >
                {/* Preview Image */}
                {style.fields?.Preview?.[0]?.url && (
                  <div className="aspect-square">
                    <img 
                      src={style.fields.Preview[0].url} 
                      alt={style.fields?.StyleValue || 'Style preview'}
                      width={style.fields.Preview[0].width || 640}
                      height={style.fields.Preview[0].height || 640}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>
                )}

                {/* Style Type Badge */}
                <div className="absolute bottom-2 left-2">
                  <div className="px-2 py-1 text-xs bg-zinc-800/80 text-zinc-400 rounded-full">
                    {style.fields?.StyleType || 'Unknown'}
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
                {loadingMore ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}

          {/* Loading More Indicator */}
          {loadingMore && (
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={`loading-${i}`} 
                  className="aspect-square bg-zinc-800 animate-pulse rounded-lg"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
