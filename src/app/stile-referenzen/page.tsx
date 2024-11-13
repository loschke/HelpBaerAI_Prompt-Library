"use client"

import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { LoadingBear } from "@/components/ui/loading-bear";
import { StyleSidePanel } from "@/components/ui/style-side-panel";
import { FileText, Image, Code } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

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

const STYLE_TYPES = {
  ALL: 'all',
  STYLE_REF: 'Style Referenz --SREF',
  PERSONAL: 'Personal Style --P',
  TEXT: 'Text Style',
  IMAGE: 'Bild Referenz'
} as const;

const MIDJOURNEY_ONLY_TYPES = [STYLE_TYPES.STYLE_REF, STYLE_TYPES.PERSONAL];
const ALL_PLATFORM_TYPES = [STYLE_TYPES.TEXT, STYLE_TYPES.IMAGE];

const getPlatformColor = (platform?: string) => {
  switch (platform?.toLowerCase()) {
    case 'midjourney':
      return 'bg-blue-600 text-white';
    case 'dall-e':
      return 'bg-green-600 text-white';
    case 'stable diffusion':
      return 'bg-purple-600 text-white';
    case 'firefly':
      return 'bg-orange-600 text-white';
    case 'leonardo':
      return 'bg-red-600 text-white';
    case 'ideogram':
      return 'bg-indigo-600 text-white';
    default:
      return 'bg-zinc-700 text-white';
  }
};

export default function StylesReferencesPage() {
  const { data: session } = useSession();
  const [styles, setStyles] = useState<StyleRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextOffset, setNextOffset] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<StyleRecord | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>(STYLE_TYPES.ALL);
  const [allStyles, setAllStyles] = useState<StyleRecord[]>([]);

  useEffect(() => {
    fetchStyles();
  }, []);

  useEffect(() => {
    filterStyles();
  }, [selectedFilter, allStyles]);

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
        const newStyles = isInitialLoad ? result.data : [...allStyles, ...result.data];
        setAllStyles(newStyles);
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

  const filterStyles = () => {
    let filteredStyles = [...allStyles];

    if (selectedFilter !== STYLE_TYPES.ALL) {
      filteredStyles = filteredStyles.filter(style => 
        style.fields?.StyleType === selectedFilter
      );
    }

    setStyles(filteredStyles);
  };

  const loadMore = () => {
    if (nextOffset && !loadingMore) {
      fetchStyles(nextOffset);
    }
  };

  const handleStyleClick = (style: StyleRecord) => {
    setSelectedStyle(style);
    setIsPanelOpen(true);
  };

  const handlePanelClose = () => {
    setIsPanelOpen(false);
    setSelectedStyle(null);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value);
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

            {/* New Content */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Die Macht der Styles in KI-Bildgenerierung
            </h2>
            <p className="text-2xl text-foreground leading-relaxed">
              Styles sind der Schlüssel für konsistente und hochwertige KI-Bilder. Sie definieren das visuelle
              Erscheinungsbild und die Ästhetik eurer kreativen Projekte.
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-black/30 border-0">
                <CardContent className="flex flex-col items-center p-6">
                  <div className="mb-4 rounded-full bg-yellow-200/20 p-3">
                    <FileText className="h-6 w-6 text-yellow-200" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">Text-Style-Referenzen</h3>
                  <p className="text-sm text-slate-300">Vorgefertigte Stilbeschreibungen für präzise Prompts</p>
                </CardContent>
              </Card>

              <Card className="bg-black/30 border-0">
                <CardContent className="flex flex-col items-center p-6">
                  <div className="mb-4 rounded-full bg-pink-200/20 p-3">
                    <Image className="h-6 w-6 text-pink-200" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">Bild-Style-Referenzen</h3>
                  <p className="text-sm text-slate-300">Visuelle Vorlagen für komplexe Stilübertragungen</p>
                </CardContent>
              </Card>

              <Card className="bg-black/30 border-0">
                <CardContent className="flex flex-col items-center p-6">
                  <div className="mb-4 rounded-full bg-blue-200/20 p-3">
                    <Code className="h-6 w-6 text-blue-200" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">Style-Codes</h3>
                  <p className="text-sm text-slate-300">Kuratierte Codes für konsistente Midjourney-Stile</p>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-gray-50 dark:bg-zinc-950">
        <div className="w-full mx-auto py-8">
          {/* Filter */}
          <div className="px-4 mb-6">
            <div className="flex flex-col gap-1 max-w-xs text-center mx-auto">
              <select
                id="style-filter"
                value={selectedFilter}
                onChange={handleFilterChange}
                className="px-4 py-2 bg-zinc-800 text-white rounded-md border border-zinc-700"
                aria-label="Filter nach Stil-Typ"
              >
                <option value={STYLE_TYPES.ALL}>Alle Stile</option>
                <optgroup label="Midjourney Exklusiv">
                  <option value={STYLE_TYPES.STYLE_REF}>Style Referenz --SREF (Midjourney)</option>
                  <option value={STYLE_TYPES.PERSONAL}>Personal Style --P (Midjourney)</option>
                </optgroup>
                <optgroup label="Universelle Stile">
                  <option value={STYLE_TYPES.TEXT}>Text Style (Alle Plattformen)</option>
                  <option value={STYLE_TYPES.IMAGE}>Bild Referenz (Alle Plattformen)</option>
                </optgroup>
              </select>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4">
            {styles.map((style) => (
              <div 
                key={style.id} 
                className="group relative border border-zinc-800 rounded-lg overflow-hidden bg-zinc-950 cursor-pointer"
                onClick={() => handleStyleClick(style)}
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

                {/* Platform Badge - Top Right */}
                {style.fields?.Platform && (
                  <div className="absolute top-2 right-2">
                    <div className={`px-3 py-1 text-xs rounded-full font-medium shadow-lg ${getPlatformColor(style.fields.Platform)}`}>
                      {style.fields.Platform}
                    </div>
                  </div>
                )}

                {/* Style Type Badge - Bottom */}
                <div className="absolute bottom-2 left-2">
                  <div className="px-3 py-1 text-xs bg-black text-white rounded-full font-medium shadow-lg">
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

      {/* Side Panel */}
      <StyleSidePanel
        isOpen={isPanelOpen}
        onClose={handlePanelClose}
        styleData={selectedStyle || undefined}
        session={session}
      />
    </main>
  );
}
