import React from 'react'
// import bgRegistration from "@/assets/bgRegistration.jpg"
import { FcGoogle } from "react-icons/fc";
import { AiOutlineGithub } from "react-icons/ai";
import { FiUserPlus } from "react-icons/fi";

// import Image from 'next/image'
// import RegistrationContent from "@/assets/RegistrationContent.jpg"
// import  "./ReistrationPage.css"

const RegistrationPage = () => {
  return (
    <>   
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap"
      rel="stylesheet"
    />
    <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
      <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
        <div>
          <img
            src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
            className="w-32 mx-auto"
          />
        </div>
        <div className="mt-12 flex flex-col items-center">
          <h1 className="text-2xl xl:text-3xl font-extrabold">
            Sign up for templatana
          </h1>
          <div className="w-full flex-1 mt-8">
            <div className="flex flex-col items-center">
              <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                <div className="bg-white p-2 rounded-full">
                  <FcGoogle className="w-6 h-6" />
                </div>
                <span className="ml-4">Sign Up with Google</span>
              </button>
              <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                <div className="bg-white p-1 rounded-full">
                  <AiOutlineGithub className="w-6 h-6" />
                </div>
                <span className="ml-4">Sign Up with GitHub</span>
              </button>
            </div>
            <div className="my-12 border-b text-center">
              <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                Or sign up with e-mail
              </div>
            </div>
            <div className="mx-auto max-w-xs">
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="email"
                placeholder="Email"
              />
              <input
                className="w-full px-8 py-4   mt-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="tel"
                placeholder="Phone Number"
              />
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                type="password"
                placeholder="Password"
              />
              <button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                <svg
                  className="w-6 h-6 -ml-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="8.5" cy={7} r={4} />
                  <path d="M20 8v6M23 11h-6" />
                </svg>
                <span className="ml-3">Sign Up</span>
              </button>
              <p className="mt-6 text-xs text-gray-600 text-center">
                I agree to abide by templatana's
                <a href="#" className="border-b border-gray-500 border-dotted">
                  Terms of Service
                </a>
                and its
                <a href="#" className="border-b border-gray-500 border-dotted">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
        <div
          className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url("https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg")'
          }}
        />
      </div>
    </div>
    <div
      className="REMOVE-THIS-ELEMENT-IF-YOU-ARE-USING-THIS-PAGE hidden treact-popup fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
    >
      <div className="max-w-lg p-8 sm:pb-4 bg-white rounded shadow-lg text-center sm:text-left">
        <h3 className="text-xl sm:text-2xl font-semibold mb-6 flex flex-col sm:flex-row items-center">
          <div className="bg-green-200 p-2 rounded-full flex items-center mb-4 sm:mb-0 sm:mr-2">
            <FiUserPlus/>
          </div>
          Free TailwindCSS Component Kit!
        </h3>
        <p>
          I recently released Treact, a <span className="font-bold">free</span>{" "}
          TailwindCSS Component Kit built with React.
        </p>
        <p className="mt-2">
          It has 52 different UI components, 7 landing pages, and 8 inner pages
          prebuilt. And they are customizable!
        </p>
        <div className="mt-8 pt-8 sm:pt-4 border-t -mx-8 px-8 flex flex-col sm:flex-row justify-end leading-relaxed">
          <button className="close-treact-popup px-8 py-3 sm:py-2 rounded border border-gray-400 hover:bg-gray-200 transition duration-300">
            Close
          </button>
          <a
            className="font-bold mt-4 sm:mt-0 sm:ml-4 px-8 py-3 sm:py-2 rounded bg-purple-700 text-gray-100 hover:bg-purple-900 transition duration-300 text-center"
            href="https://treact.owaiskhan.me"
            target="_blank"
          >
            See Treact
          </a>
        </div>
      </div>
    </div>
  </>
  

  )
}

export default RegistrationPage