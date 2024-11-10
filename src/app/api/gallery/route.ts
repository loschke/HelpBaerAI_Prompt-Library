import { NextResponse } from 'next/server';
import Airtable from 'airtable';

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID!);

export async function GET() {
  try {
    const records = await base(process.env.AIRTABLE_TABLE_IMAGES!)
      .select({
        maxRecords: 100
      })
      .firstPage();

    return NextResponse.json({ 
      success: true, 
      data: records
    });

  } catch (error) {
    console.error('Airtable Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
