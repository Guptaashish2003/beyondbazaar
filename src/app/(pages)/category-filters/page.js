import FilterComponent from '@/components/FilterComponent/filterComponent'
import Productcard from '@/components/ProductCards/Productcard'
import Pagination from '@/components/pagination/Pagination'
import { useGetData } from '@/redux/api/useGetData'
import React from 'react'


async function page(context) {
  let {page=1,keyword} = context.searchParams
  let link
  if(keyword){
    link = `/product/all-product?limit=20&keyword=${keyword}&page=${page}`

  }
  else{
    link = `/product/all-product?limit=20&page=${page}`
  }
  const {data,length} = await useGetData(link)
  return (
    <>
     <FilterComponent>
        <div className='flex flex-wrap justify-evenly'>
          {data.map((pdt)=><Productcard key={pdt._id} animation={true} img={pdt?.productImage[0]} price={pdt.productPrice} title={pdt.productName} slug={pdt.slug}/>)}
          

  
    
        </div>
           <Pagination path="/category-filters" limitOption={false} keyword={keyword} page={page} documentCount={length} className='justify-center mt-4'/>
     </FilterComponent>
    </>
  )
}

export default page
