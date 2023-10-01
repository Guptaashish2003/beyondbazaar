"use client"
import React from 'react'
import ProductPage from '@/components/singleProduct/ProductPage'
import store from '@/app/store'
import {Provider} from 'react-redux'

const page = () => {
  return (
    <Provider store={store}>
      <ProductPage/>
    </Provider>   
    
  )
}

export default page