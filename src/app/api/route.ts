import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'hello world',
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
    dotenvxEnv: process.env.DOTENVX_ENV,
    sampleSecret: process.env.SAMPLE_SECRET,
  });
}
