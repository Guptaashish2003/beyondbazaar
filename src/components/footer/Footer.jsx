import React from 'react'
import { CiMail } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import SocialMedial from '../SocialMediaIcons/SocialMedial';
import beyondbazaar from '@/assets/beyondbazaar.png'

import Image from 'next/image'


const Footer = () => {
  return (
  
  <footer className="bg-white">
    <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-16 sm:px-6 lg:px-8 lg:pt-24">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div>
          <div className="flex justify-center text-teal-600 sm:justify-start">
            <Image
              src={beyondbazaar}
              className='w-1/2  object-cover'
              alt="logo"
              />            
          </div>
  
          <p
            className="mt-6 max-w-md text-center leading-relaxed text-gray-500 sm:max-w-xs sm:text-left"
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
            consequuntur amet culpa cum itaque neque.
          </p>
          <SocialMedial hover={"hover:text-black"} className='gap-4 mt-8 text-2xl' facebook={'https://www.facebook.com/'} instagram={'https://www.facebook.com/'} twitter={'https://www.facebook.com/'} linkedin={'https://www.facebook.com/'}/>
        
        </div>
  
        <div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2"
        >
          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-gray-900">About Us</p>
  
            <ul className="mt-8 space-y-4 text-sm">
              <li>
                <a
                  className="text-gray-700 transition hover:text-gray-700/75"
                  href="/"
                >
                  
                </a>
              </li>
  
              <li>
                <a
                  className="text-gray-700 transition hover:text-gray-700/75"
                  href="/"
                >
                  Meet the Team
                </a>
              </li>
  
              <li>
                <a
                  className="text-gray-700 transition hover:text-gray-700/75"
                  href="/"
                >
                  Employee Handbook
                </a>
              </li>
  
              <li>
                <a
                  className="text-gray-700 transition hover:text-gray-700/75"
                  href="/"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  className="text-gray-700 transition  hover:text-gray-700/75"
                  href="/"
                >
                  About-Us
                </a>
              </li>
            </ul>
          </div>
  
          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-gray-900">Our Services</p>
  
            <ul className="mt-8 space-y-4 text-sm">
              <li>
                <a
                  className="text-gray-700 transition hover:text-gray-700/75"
                  href="/"
                >
                  Web Development
                </a>
              </li>
  
              <li>
                <a
                  className="text-gray-700 transition hover:text-gray-700/75"
                  href="/"
                >
                  Web Design
                </a>
              </li>
  
              <li>
                <a
                  className="text-gray-700 transition hover:text-gray-700/75"
                  href="/"
                >
                  Marketing
                </a>
              </li>
  
              <li>
                <a
                  className="text-gray-700 transition hover:text-gray-700/75"
                  href="/"
                >
                  Google Ads
                </a>
              </li>
            </ul>
          </div>
  
          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-gray-900">Helpful Links</p>
  
            <ul className="mt-8 space-y-4 text-sm">
              <li>
                <a
                  className="text-gray-700 transition hover:text-gray-700/75"
                  href="/"
                >
                  FAQs
                </a>
              </li>
  
          
              <li>
                <a
                  className="text-gray-700 transition  hover:text-gray-700/75"
                  href="/"
                >
                  Privacy & Policy
                </a>
              </li>
              <li>
                <a
                  className="text-gray-700 transition  hover:text-gray-700/75"
                  href="/"
                >
                  Support
                </a>
              </li>
            
  
              <li>
                <a
                  className="group flex  gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                  href="/"
                >
                  <span
                    className="text-gray-700 transition group-hover:text-gray-700/75"
                  >
                    Live Chat
                  </span>
  
                  <span className="relative flex h-2 w-2">
                    <span
                      className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"
                    ></span>
                    <span
                      className="relative inline-flex h-2 w-2 rounded-full bg-teal-500"
                    ></span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
  
          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-gray-900">Contact Us</p>
  
            <ul className="mt-8 space-y-4 text-sm">
              <li>
                <a
                  className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                  href="/"
                >
                  <CiMail className='h-5 w-5 shrink-0 text-gray-900'/>
  
                  <span className="flex-1 text-gray-700">john@doe.com</span>
                </a>
              </li>
  
              <li>
                <a
                  className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                  href="/"
                >
                 <IoCallOutline className="h-5 w-5 shrink-0 text-gray-900" />
  
                  <span className="flex-1 text-gray-700">0123456789</span>
                </a>
              </li>
  
              <li
                className="flex items-start justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
              >
                <GrLocation className='h-5 w-5 shrink-0 text-gray-900'/>
  
                <address className="-mt-0.5 flex-1 not-italic text-gray-700">
                  Delhi
                </address>
              </li>
            </ul>
          </div>
        </div>
      </div>
  
      <div className="mt-12 border-t border-gray-100 pt-6">
        <div className="text-center sm:flex sm:justify-between sm:text-left">
          <p className="text-sm text-gray-500">
            <span className="block sm:inline">All rights reserved.</span>
  
            <a
              className="inline-block text-teal-600 underline transition hover:text-teal-600/75"
              href="/"
            >
              Terms & Conditions
            </a>
  
            <span>&middot;</span>
  
            <a
              className="inline-block text-teal-600 underline transition hover:text-teal-600/75"
              href="/"
            >
              Privacy Policy
            </a>
          </p>
  
          <p className="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0">
            &copy; BytesBazar
          </p>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer