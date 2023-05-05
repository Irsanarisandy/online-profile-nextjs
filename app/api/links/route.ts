import { NextResponse } from 'next/server';

import { publicLinks } from '.data/publicLinks';

export async function GET() {
  return NextResponse.json(publicLinks);
}
