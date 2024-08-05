'use client';
import Image from 'next/image';
import { TokenGate } from '@/components/TokenGate';
import { getSession } from '@/utils/session';

/**
 * The revalidate property determine's the cache TTL for this page and
 * all fetches that occur within it. This value is in seconds.
 */
export const revalidate = 180;

async function Content({ searchParams }: { searchParams: SearchParams }) {
  const data = await getSession(searchParams);
  // Console log the data to see what's available
  // You can see these logs in the terminal where
  // you run `yarn dev`
  console.log({ data });
  return (
    <main className="flex min-h-screen w-full h-full flex-col items-center justify-between p-0">
      <iframe
      id="JotFormIFrame-241985099094067"
      title="Form with invisible email"
      onLoad={() => window.parent.scrollTo(0, 0)}
      allowTransparency={true}
      allow="geolocation; microphone; camera; fullscreen"
      src={`https://form.jotform.com/241985099094067?email=${data.client?.email}`}
      frameBorder="0"
      className="w-full h-full border-none"
      style={{
        minWidth: '100%',
        maxWidth: '100%',
        height: '700px',
        border: 'none'
      }}
      scrolling="no"
    />
    <script src='https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js' async></script>
    </main>
  );
}

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return (
    <TokenGate searchParams={searchParams}>
      <Content searchParams={searchParams} />
    </TokenGate>
  );
}
