import { getAirtableRecords } from '@/lib/airtable';

export const revalidate = 0;

export default async function AirtableTestPage() {
  const { records, error } = await getAirtableRecords();

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Airtable Test</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Airtable Kategorien</h1>
      
      {Object.entries(records).map(([category, categoryRecords]: [string, any]) => (
        <div key={category} className="mb-12">
          <h2 className="text-xl font-semibold mb-4">{category}</h2>
          
          {/* Horizontaler Slider Container */}
          <div className="relative">
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-4 min-w-full">
                {categoryRecords.map((record: any) => (
                  <div 
                    key={record.id}
                    className="flex-none w-72"
                  >
                    {record.fields.referenceImage && record.fields.referenceImage[0] && (
                      <div className="space-y-2">
                        <div className="relative aspect-video">
                          <img 
                            src={record.fields.referenceImage[0].thumbnails.large.url}
                            alt={record.fields.name}
                            className="rounded-lg object-cover w-full h-full"
                          />
                        </div>
                        <p className="font-medium text-sm">{record.fields.name}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Füge custom CSS für den Scrollbar hinzu
const styles = `
  .overflow-x-auto {
    scrollbar-width: thin;
    scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
  }
  
  .overflow-x-auto::-webkit-scrollbar {
    height: 6px;
  }
  
  .overflow-x-auto::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .overflow-x-auto::-webkit-scrollbar-thumb {
    background-color: rgba(155, 155, 155, 0.5);
    border-radius: 20px;
    border: transparent;
  }
`;
