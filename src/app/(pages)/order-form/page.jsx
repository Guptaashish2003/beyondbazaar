import React from 'react'
import InputBtn from '@/components/Form/InputBtn'
import SubmitButton from '@/components/Form/SubmitButton'

const page = () => {
  return (
    <>
    <p className='w-2/3  flex flex-col mx-auto text-center'>
      Time is Money Get Your Location Instant !!
    <SubmitButton
    value='Get Location'
    className="border-2 border-black rounded-md px-4 py-2 mt-4 hover:text-white hover:bg-gray-800 w-[fit-content] mx-auto"
    />
    </p>
    <div className='flex flex-col gap-1 w-1/2 mx-auto mt-8'>
    <InputBtn
    placeholder="Name"
    />
    <InputBtn
    placeholder="Name"
    />
    <InputBtn
    placeholder="Name"
    />
    <InputBtn
    placeholder="Name"
    />
    </div>
    </>
  )
}

export default page