import { ImageResponse } from 'next/og';
import { type NextRequest } from 'next/server';

const quicksandFont = fetch(
  'https://github.com/andrew-paglinawan/QuicksandFamily/blob/master/fonts/statics/Quicksand-Regular.ttf?raw=true'
).then((res) => res.arrayBuffer());

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const backgroundColor = searchParams.has('backgroundColor')
    ? (searchParams.get('backgroundColor') as string)
    : 'transparent';
  const color = searchParams.has('color')
    ? (searchParams.get('color') as string)
    : 'black';
  const height = searchParams.has('height')
    ? parseInt(searchParams.get('height') as string)
    : 180;
  const width = searchParams.has('width')
    ? parseInt(searchParams.get('width') as string)
    : 180;
  const scale = searchParams.has('scale')
    ? parseFloat(searchParams.get('scale') as string)
    : 1;

  const quicksandData = await quicksandFont;

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor,
          color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 100,
          height: '100%',
          width: '100%',
          transform: `scale(${scale}, ${scale})`
        }}
      >
        <span
          style={{
            left: 15,
            lineHeight: 0.6,
            paddingBottom: 44,
            paddingTop: 30
          }}
        >
          I
        </span>
        <span
          style={{
            borderColor: color,
            borderRadius: '30%',
            borderStyle: 'solid',
            borderWidth: 8,
            borderLeftWidth: 0,
            lineHeight: 0.6,
            marginRight: 23,
            paddingBottom: 44,
            paddingTop: 30,
            paddingLeft: 34,
            paddingRight: 30
          }}
        >
          A
        </span>
      </div>
    ),
    {
      height,
      width,
      fonts: [
        {
          name: 'Quicksand',
          data: quicksandData,
          style: 'normal'
        }
      ]
      // debug: process.env.NODE_ENV !== 'production'
    }
  );
}
