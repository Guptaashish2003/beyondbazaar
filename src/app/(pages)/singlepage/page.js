"use client"
import React from 'react'
import ProductPage from '@/components/singleProduct/ProductPage'

const page = () => {
  return (
    <Provider store={store}>
      <ProductPage/>
    </Provider>   
    
  )
}

export default page