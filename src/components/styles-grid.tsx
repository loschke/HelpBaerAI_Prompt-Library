'use client';

import { useState } from 'react';
import { useSession } from "next-auth/react";
import { StyleSidePanel } from "@/components/ui/style-side-panel";

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

interface StylesGridProps {
  initialStyles: StyleRecord[];
}

const STYLE_TYPES = {
  ALL: 'all',
  STYLE_REF: 'Style Referenz --SREF',
  PERSONAL: 'Personal Style --P',
  TEXT: 'Text Style',
  IMAGE: 'Bild Referenz'
} as const;

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

export function StylesGrid({ initialStyles }: StylesGridProps) {
  const { data: session } = useSession();
  const [styles, setStyles] = useState<StyleRecord[]>(initialStyles);
  const [selectedStyle, setSelectedStyle] = useState<StyleRecord | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>(STYLE_TYPES.ALL);

  const filterStyles = (filter: string) => {
    setSelectedFilter(filter);
    if (filter === STYLE_TYPES.ALL) {
      setStyles(initialStyles);
    } else {
      setStyles(initialStyles.filter(style => 
        style.fields?.StyleType === filter
      ));
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

  return (
    <>
      {/* Filter */}
      <div className="px-4 mb-6">
        <div className="flex flex-col gap-1 max-w-xs text-center mx-auto">
          <select
            id="style-filter"
            value={selectedFilter}
            onChange={(e) => filterStyles(e.target.value)}
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

      {/* Side Panel */}
      <StyleSidePanel
        isOpen={isPanelOpen}
        onClose={handlePanelClose}
        styleData={selectedStyle || undefined}
        session={session}
      />
    </>
  );
}
