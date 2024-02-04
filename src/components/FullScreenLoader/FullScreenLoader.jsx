import React from 'react'

export default function FullScreenLoader() {
  return (
    <div className='fixed z-50 h-screen w-screen top-0 right-0 flex justify-center items-center bg-[#3333337d]'>
          <section id="global" className='text-white'>
        <div id="top" className="mask">
          <div className="plane" />
        </div>
        <div id="middle" className="mask">
          <div className="plane" />
        </div>
        <div id="bottom" className="mask">
          <div className="plane" />
        </div>
        <p className="mt-4 loading">
          <i className='text-white'>LOADING...</i>
        </p>
      </section>
    </div>
  )
}
