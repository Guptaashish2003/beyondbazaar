import React from 'react'
import bgRegistration from "@/assets/bgRegistration.jpg"
import Image from 'next/image'
import RegistrationContent from "@/assets/RegistrationContent.jpg"

const RegistrationPage = () => {
  return (
    
    <>
  <meta charSet="utf-8" />
  <title>RegistrationForm_v1 by Colorlib</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  {/* MATERIAL DESIGN ICONIC FONT */}
  <link
    rel="stylesheet"
    href="fonts/material-design-iconic-font/css/material-design-iconic-font.min.css"
  />
  {/* STYLE CSS */}
  <link rel="stylesheet" href="css/style.css" />
  <div
    className="wrapper mt-16"
    style={{ backgroundImage : {bgRegistration} }}
  >
    <div className="inner">
      <div className="image-holder">
  
        <Image src= {RegistrationContent}/>
      </div>
      <form action="">
        <h3>Registration Form</h3>
        <div className="form-group">
          <input
            type="text"
            placeholder="First Name"
            className="form-control"
          />
          <input type="text" placeholder="Last Name" className="form-control" />
        </div>
        <div className="form-wrapper">
          <input type="text" placeholder="Username" className="form-control" />
          <i className="zmdi zmdi-account" />
        </div>
        <div className="form-wrapper">
          <input
            type="text"
            placeholder="Email Address"
            className="form-control"
          />
          <i className="zmdi zmdi-email" />
        </div>
        <div className="form-wrapper">
          <input
            type="number"
            placeholder="Phone Number"
            className="form-control"
          />
          <i className="zmdi zmdi-email" />
        </div>
        <div className="form-wrapper">
          <select name="" id="" className="form-control">
            <option value="" disabled="" selected="">
              Gender
            </option>
            <option value="male">Male</option>
            <option value="femal">Female</option>
            <option value="other">Other</option>
          </select>
          <i className="zmdi zmdi-caret-down" style={{ fontSize: 17 }} />
        </div>
        <div className="form-wrapper">
          <input
            type="password"
            placeholder="Password"
            className="form-control"
          />
          <i className="zmdi zmdi-lock" />
        </div>
        <div className="form-wrapper">
          <input
            type="password"
            placeholder="Confirm Password"
            className="form-control"
          />
          <i className="zmdi zmdi-lock" />
        </div>
        <button>
          Register
          <i className="zmdi zmdi-arrow-right" />
        </button>
      </form>
    </div>
  </div>
  {/* This templates was made by Colorlib (https://colorlib.com) */}
</>

  )
}

export default RegistrationPage