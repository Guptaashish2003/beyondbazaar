import React from 'react'

const FeatureCard = ({children,title,description}) => {
  return (
    <div className='flex flex-col justify-center items-center max-md:w-full  w-1/3 m-2 p-4  align-center'>
        <div className='icon w-28 h-24'>
            {children}
        </div > 
        <h1 className="title text-4xl max-lg:text-2xl uppercase font-bold text-black">{title}</h1>
       <p className="para text-center max-lg:text-base mt-6 text-xl">{description}</p>
      
    </div>
  )
}

export default FeatureCard
