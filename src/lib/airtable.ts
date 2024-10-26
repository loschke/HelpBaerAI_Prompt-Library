import Airtable from 'airtable';

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID!);

const table = base(process.env.AIRTABLE_TABLE_NAME!);

// Fisher-Yates Shuffle Algorithmus
const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const minifyRecord = (record: any) => {
  return {
    id: record.id,
    fields: {
      name: record.fields.Name,
      categories: record.fields.Verwendung || [],
      referenceImage: record.fields.Referenzbild ? record.fields.Referenzbild.map((attachment: any) => ({
        url: attachment.url,
        filename: attachment.filename,
        size: attachment.size,
        type: attachment.type,
        thumbnails: attachment.thumbnails ? {
          small: attachment.thumbnails.small,
          large: attachment.thumbnails.large
        } : null
      })) : []
    }
  };
};

export async function getAirtableRecords() {
  try {
    const records = await table.select({
      fields: ['Name', 'Referenzbild', 'Verwendung']
    }).all();
    
    const minifiedRecords = records.map(record => minifyRecord(record));
    
    // Gruppiere Records nach Kategorien
    const groupedByCategory = minifiedRecords.reduce((acc: any, record: any) => {
      record.fields.categories.forEach((category: string) => {
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(record);
      });
      return acc;
    }, {});

    // Shuffle records in each category
    Object.keys(groupedByCategory).forEach(category => {
      groupedByCategory[category] = shuffleArray(groupedByCategory[category]);
    });

    return { records: groupedByCategory };
  } catch (error) {
    console.error('Error fetching Airtable records:', error);
    return { error: 'Failed to fetch records' };
  }
}
