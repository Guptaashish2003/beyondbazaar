import FilterComponent from '@/components/FilterComponent/filterComponent'
import Productcard from '@/components/ProductCards/Productcard'
import Pagination from '@/components/pagination/Pagination'
import { useGetData } from '@/redux/api/useGetData'
import React from 'react'


async function page(context) {
  const {page} = context.searchParams
  const {data} = await useGetData("/product/all-product")

  return (
    <>
     <FilterComponent>
        <div className='flex flex-wrap justify-evenly'>
          {data.map((pdt)=><Productcard animation={true}/>)}
          

  
    
        </div>
           <Pagination className='justify-center mt-4'/>
     </FilterComponent>
    </>
  )
}

export default page
