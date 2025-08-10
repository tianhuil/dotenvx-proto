import { NextResponse } from 'next/server';
import * as dotenvx from '@dotenvx/dotenvx';
dotenvx.config({
  path: `.env.${process.env.VERCEL_ENV}`,
});

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    message: 'hello world',
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
    dotenvxEnv: dotenvx.get('DOTENVX_ENV'),
    sampleSecret: dotenvx.get('SAMPLE_SECRET'),
  });
}
