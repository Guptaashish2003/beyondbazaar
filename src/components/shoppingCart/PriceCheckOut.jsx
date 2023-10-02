import React from 'react'

const PriceCheckOut = () => {
  return (
    <section className="flex mt-3 flex-col bg-gray-300 justify-start w-[35%] border-solid border-slate-400 border-2 h-full p-4 mr-5">
          <p className="py-1"> Enter Promo Code</p>
          <div className="flex justify-between  py-2 gap-1">
            <input type="text" placeholder="Promo Code"  className="w-2/3 p-2"/>
            <button type="button" className="text-white w-1/3 cursor-pointer bg-black">Apply</button>
          </div>
          <div className="flex gap-2 flex-col">
            <p className="flex justify-between">Shipping Cost <p>40</p></p>
            <p className="flex justify-between">Discount <p>40</p></p>
            <p className="flex justify-between">Tax <p>18%</p></p>
            <p className="flex justify-between font-bold py-2 text-xl"> Estimated Total <p>40</p></p>
            </div>
            <button type="button" className="text-black cursor-pointer w-1/3 m-auto bg-yellow-400">Apply</button>

        </section>
  )
}

export default PriceCheckOut