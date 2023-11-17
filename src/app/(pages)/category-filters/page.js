import FilterComponent from '@/components/FilterComponent/filterComponent'
import Productcard from '@/components/ProductCards/Productcard'
import React from 'react'

function page() {
  return (
    <>
     <FilterComponent>
        <div className='flex flex-wrap justify-evenly'>
          <Productcard animation={true}/>
            <Productcard animation={true}/>
  
    
        </div>
     </FilterComponent>
    </>
  )
}

export default page
