import FilterComponent from '@/components/FilterComponent/filterComponent'
import Productcard from '@/components/ProductCards/Productcard'
import Pagination from '@/components/pagination/Pagination'
import { useGetData } from '@/redux/api/useGetData'
import React from 'react'

export async function generateMetadata({ searchParams  }) {
  if(!searchParams.keyword) {
    return {
      title: "search filter page",
      description: "search filter page",
    };
  }
  return {
    title: searchParams.keyword,
    description: searchParams.keyword,
  };
}

async function page(context) {
  let {page=1,keyword,sort} = context.searchParams
  let link
  if(keyword && sort){
    link = `/api/product/all-product?limit=10&keyword=${keyword}&sort=${sort}&page=${page}`

  }
  else if(keyword){
    link = `/api/product/all-product?limit=10&keyword=${keyword}&page=${page}`

  }
  else{
    link = `/api/product/all-product?limit=10&page=${page}`
  }
  const {data,length} = await useGetData(link)

  return (
    <>
     <FilterComponent path="/category-filters" keyword={keyword}>
        <div className='flex flex-wrap justify-evenly'>
          {data.map((pdt)=><Productcard key={pdt._id} animation={true} img={pdt?.productImage[0]} price={pdt.productPrice} title={pdt.productName} slug={pdt.slug}/>)}
    
        </div>
           <Pagination path="/category-filters" limitOption={false} keyword={keyword} sort={sort} page={page} documentCount={length} className='justify-center mt-4'/>
     </FilterComponent>
    </>
  )
}

export default page
