'use client'

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { LockOpen, Crown } from "lucide-react"

interface ImageData {
  id: string;
  fields?: {
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

export default function Gallery() {
  const [data, setData] = useState<ImageData[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/gallery');
        const result = await response.json();
        
        if (result.success) {
          setData(result.data);
        } else {
          setError('Failed to load data');
        }
      } catch (err) {
        setError('Failed to load data');
        console.error('Error:', err);
      }
    };

    fetchData();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-4 space-y-8">
      {/* Grid mit Bildern */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {data.map((item) => (
          <div key={item.id} className="group relative border border-zinc-800 rounded-lg overflow-hidden bg-zinc-950">
            {/* Status Badge - jetzt absolut positioniert */}
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

            {/* Bild */}
            {item.fields?.Promptvorschau?.[0]?.url && (
              <div className="aspect-square">
                <img 
                  src={item.fields.Promptvorschau[0].url} 
                  alt={item.fields?.Prompt || 'Prompt preview'}
                  width={640}
                  height={640}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Unterer Bereich */}
            <div className="p-3 space-y-2">
              <Badge variant="outline" className="text-xs text-zinc-400 border-zinc-700">
                {item.fields?.Kategorie?.[0] || 
                 `Prompt ${item.fields?.["Prompt ID"] || 'Unknown'}`}
              </Badge>
              <p className="text-xs text-zinc-300 line-clamp-3">
                {item.fields?.Prompt || 'No prompt description available'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* JSON Debug Ausgabe */}
      <div className="mt-8 p-4 bg-zinc-900 rounded-lg">
        <h3 className="text-lg text-zinc-300 mb-2">Debug: API Response</h3>
        <pre className="text-xs text-zinc-400 overflow-auto max-h-[500px]">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
}
