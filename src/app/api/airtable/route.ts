import { NextResponse } from 'next/server';
import { getAirtableRecords } from '@/lib/airtable';

export async function GET() {
  try {
    const { records, error } = await getAirtableRecords();
    
    if (error) {
      return NextResponse.json({ error: 'Failed to fetch records' }, { status: 500 });
    }
    
    return NextResponse.json({ records });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
