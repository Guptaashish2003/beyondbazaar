import { useGetData } from "@/redux/api/useGetData";
import { ImageResponse } from 'next/og'
import { title } from "process";
import style from "styled-jsx/style";
import { fontSize, width, height } from "tailwindcss/defaultTheme";


export const contentType = "image/png";
// Image metadata
export const alt = 'product image'
export const size = {
  width: 1200,
  height: 630,
}


export default async function Image({params}) {
    const { data } = await useGetData(`/product/single-product/${params.slug}`);


    return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {data.data.productName}
      </div>
    ),
    {
      ...size,
    }
  )
  }

