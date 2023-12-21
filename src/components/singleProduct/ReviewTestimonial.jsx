import Image from "next/image";
import React from "react";
import { TiStarFullOutline } from "react-icons/ti";
function ReviewTestimonial() {
  return (
    <section className="border-y-2 flex gap-x-2 py-4">
      <Image
        alt="image"
        width={50}
        height={50}
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="w-12 h-12 rounded-full object-fill"
      ></Image>
      <div >
        <div className="flex justify-between ">
            <span>
          <p className="font-bold uppercase text-[">raju bhai...</p>
          <div className="flex">
          <TiStarFullOutline />
          <TiStarFullOutline />
          <TiStarFullOutline />
          <TiStarFullOutline />
          <TiStarFullOutline />
          </div>
            </span>
            <span>
                10-12-2903
            </span>
        </div>
        <div className="my-4">
          <h3 className="font-extrabold   text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            voluptas quod esse deleniti dolore excepturi perspiciatis mollitia
            expedita, doloribus iste quae aut! Mollitia eius cumque esse
            temporibus laudantium quas soluta.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ReviewTestimonial;
