import React from 'react'

const YourAccSetting = ({img,title,description}) => {
  return (
    <div className='w-full max-sm:h-52 border-solid border-3  active:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 border-gray-400 cursor-pointer rounded-sm ring-offset-2 ring-2 ring-gray-500  hover:text-black'>
        <section className='w-full flex flex-col justify-center  bg-gray-50'>
            <div className="flex max-sm:flex-col max-md:items-center">
                <div className="w-[20%] p-2 max-sm:w-1/2">
                    {img} 
                </div> 
                    <div className="flex w-[80%] gap-2 flex-col max-md:text-center max-md:items-center justify-center items-start">
                        <h1 className="text-xl max-md:text-base font-bold text-gray-800">{title}</h1>
                        <p className="text-lg max-md:text-sm text-gray-600">{description}</p>
                    </div>                
            </div>

        </section>
    </div>
  )
}

export default YourAccSetting