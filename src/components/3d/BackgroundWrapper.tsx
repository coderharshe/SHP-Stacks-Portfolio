'use client';

import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false });

export function BackgroundWrapper() {
  return <Scene />;
}
