import React from 'react'

const FeatureCard = ({children,title,description}) => {
  return (
    <div className='flex flex-col justify-center items-center w-1/3 m-2 p-4 '>
        <div className='icon w-28 h-24'>
            {children}
        </div> 
        <h1 className="title text-4xl uppercase font-bold text-black">{title}</h1>
       <p className="para text-center mt-6 text-xl">{description}</p>
      
    </div>
  )
}

export default FeatureCard
