import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const offset = searchParams.get('offset');

    // Construct the Airtable API URL
    const baseUrl = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_IMAGES}`;
    const url = offset 
      ? `${baseUrl}?offset=${offset}`
      : baseUrl;

    // Fetch data from Airtable API
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`Airtable API responded with status: ${response.status}`);
    }

    const result = await response.json();

    return NextResponse.json({ 
      success: true, 
      data: result.records,
      hasMore: !!result.offset,
      nextOffset: result.offset
    });

  } catch (error) {
    console.error('Airtable Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
