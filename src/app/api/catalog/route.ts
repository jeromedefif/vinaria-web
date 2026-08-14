import { NextResponse } from 'next/server';
import { getBeginyCatalog } from '@/lib/beginy-catalog';

export async function GET() {
  const catalog = await getBeginyCatalog();

  if (!catalog) {
    return NextResponse.json({ error: 'Katalog není momentálně dostupný' }, { status: 503 });
  }

  return NextResponse.json(catalog, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600'
    }
  });
}
