import Airtable from 'airtable';

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID!);

const table = base(process.env.AIRTABLE_TABLE_NAME!);

// Fisher-Yates Shuffle Algorithm
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
      referenceImage: record.fields.Referenzbild ? record.fields.Referenzbild.map((attachment: any) => ({
        url: attachment.url,
        filename: attachment.filename,
        size: attachment.size,
        type: attachment.type,
        thumbnails: attachment.thumbnails ? {
          small: attachment.thumbnails.small,
          large: attachment.thumbnails.large
        } : null
      })) : [],
      examples: record.fields.Beispiele ? record.fields.Beispiele.map((attachment: any) => ({
        url: attachment.url,
        filename: attachment.filename,
        size: attachment.size,
        type: attachment.type,
        thumbnails: attachment.thumbnails ? {
          small: attachment.thumbnails.small,
          large: attachment.thumbnails.large
        } : null
      })) : [],
      free: record.fields.Free || false,
      status: record.fields.Status || '',
      legend: record.fields.Legende || '',
      promptFormel: record.fields['Prompt Formel'] || ''
    }
  };
};

export async function getAirtableRecords() {
  try {
    const records = await table.select({
      fields: ['Name', 'Referenzbild', 'Free', 'Status', 'Legende', 'Prompt Formel', 'Beispiele']
    }).all();
    
    // Convert records to our format and shuffle them
    const minifiedRecords = shuffleArray(records.map(record => minifyRecord(record)));
    
    return { records: minifiedRecords };
  } catch (error) {
    console.error('Error fetching Airtable records:', error);
    return { error: 'Failed to fetch records' };
  }
}
