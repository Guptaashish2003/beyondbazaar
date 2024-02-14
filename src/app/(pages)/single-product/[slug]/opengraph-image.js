import { useGetData } from "@/redux/api/useGetData";
import { ImageResponse } from 'next/og'


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
        // ImageResponse JSX element
        <div tw="relative flex items-center justify-center">
        <img src={data?.productImage[0]} alt={data?.productName}
        style={{
          objectFit:"contain"
        }}
         />
        <div tw="absolute flex items-center bottam-8 w-full ">
          <p tw="text-white text-4xl flex font-bold m-5">{data?.productName}</p>
        </div>
      </div>
      ),
      // ImageResponse options
      {
        ...size,
       
      }
    )
  }

