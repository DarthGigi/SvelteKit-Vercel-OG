import { toReactElement } from '@ethercorps/svelte-h2j';
import { ImageResponse } from '@vercel/og';
import type { Config } from '@sveltejs/adapter-vercel';
import type { RequestHandler } from './$types';

export const config: Config = {
  runtime: 'edge'
};

export const GET: RequestHandler = async ({ params, fetch }) => {
  const fontData400 = await fetch(
    'https://og-playground.vercel.app/inter-latin-ext-400-normal.woff'
  ).then((res) => res.arrayBuffer());
  const fontData700 = await fetch(
    'https://og-playground.vercel.app/inter-latin-ext-700-normal.woff'
  ).then((res) => res.arrayBuffer());

  const template = toReactElement(`
  <div tw="flex h-full w-full flex-col items-center justify-center bg-[#131313]">
    <div tw="flex w-full max-w-sm justify-center rounded-lg border border-neutral-700 bg-neutral-800 shadow">
      <div tw="mx-auto flex flex-col items-center rounded py-10">
        <span tw="mb-1 text-xl font-medium text-white">${params.slug}</span>
      </div>
    </div>
  </div>
  `);

  try {
    return new ImageResponse(template, {
      height: 430,
      width: 819.05,
      fonts: [
        {
          name: 'Inter',
          data: fontData400,
          weight: 400,
          style: 'normal'
        },
        {
          name: 'Inter',
          data: fontData700,
          weight: 700,
          style: 'normal'
        }
      ]
    });
  } catch (error) {
    console.log(error);
    return new Response(null, {
      status: 500
    });
  }
};
