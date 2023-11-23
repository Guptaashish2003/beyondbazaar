"use client"
import React from "react";
import { useForm,SubmitHandler  } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';



const CheckOutPage = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    name: Yup.string()
    .required('Name is required'),
    number: Yup.string()
    .required('Number is required')
    .min(10, 'Number must be at least 10 characters')
    .max(10, 'Number must not exceed 10 characters'),
    address: Yup.string()
    .required('Address is required'),
    
    city: Yup.string()
    .required('City is required'),
    country: Yup.string()
    .required('Country is required'),
    state: Yup.string()
    .required('State is required'),
    District: Yup.string()
    .required('District is required'),
    pincode: Yup.string()
    .required('Pincode is required')
    .min(6, 'Pincode must be at least 6 characters')
    .max(6, 'Pincode must not exceed 6 characters'),

});
const formOptions = { resolver: yupResolver(validationSchema) };


const {  register,handleSubmit,  formState } = useForm(formOptions);
const { errors } = formState;
function onSubmit(data) {
  alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
  return false;
}



  return (
    <>
      <div className="min-h-screen p-6 bg-gray-100 flex gap-1 items-center justify-center lg:mt-16 mt-8">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className="bg-white rounded shadow-lg mx-auto p-4 px-4 md:p-8 mb-6">
              <div className="w-2/3  flex  mx-auto justify-between max-md:flex-col max-md:items-center  text-center">
                <p className="">Time is Money Get Your Location Instant !!</p>
                <div className="inline-flex items-end">
                  <button className="bg-gray-500 hover:bg-black max-md:h-11 max-md:text-xs text-white font-bold py-2 px-4 rounded">
                    Get Location
                  </button>
                </div>
              </div>

              <hr className="my-3 border border-slate-200" />
              <div className="text-gray-600 w-2/3 flex mx-auto gap-2 ">
                <p className="font-medium max-md:text-sm md text-lg">Personal Details:</p>
                <p className="p-1 max-md:text-xs max-md:p-0">Please fill out all the fields.</p>
              </div>
              <form 
              onSubmit={handleSubmit(onSubmit)}

              className="grid gap-4 gap-y-2 text-sm grid-cols-1 mx-auto w-2/3">
                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="full_name">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        {...register("name", { required: true, maxLength: 20 })}
                        {
                          ...errors.name && {
                            error: "Invalid name",
                          }
                        }
                        id="name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        defaultValue=""
                        required
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        placeholder="email@domain.com"
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="email">Contact Number</label>
                      <input
                      {...register("number", {
                        required: "Number is required",
                        pattern: {
                          value: /^[A-Za-z0-9]+/i,
                          message: "Invalid Number",
                        },
                        minLength: {
                          value: 10,
                          message: "your phone number should not less than 10 digits",
                        },
                        maxLength: {
                          value: 10,
                          message: "your phone number should noy more than 10 digits",
                        },
                      })}
                        type="tel"
                        name="number"
                        id="number"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        defaultValue=""
                        placeholder="+91 99xxxxxx00"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label htmlFor="address">Address / Street</label>
                      <input
                      {...register("address", {
                        required: "Address is required",
                        pattern: {
                          value: /^[A-Za-z]+$/i,
                          message: "Invalid Address",
                        },
                      })}
                        type="text"
                        name="address"
                        id="address"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        defaultValue=""
                        placeholder=""
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="city">City</label>
                      <input
                      {...register("city", {
                        required: "City is required",
                        pattern: {
                          value: /^[A-Za-z]+$/i,
                          message: "Invalid City",
                        },
                      })
                      }
                        type="text"
                        name="city"
                        id="city"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        defaultValue=""
                        placeholder=""
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="country">Country / region</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input
                        {...register("country", {
                          required: "Country is required",
                          pattern: {
                            value: /^[A-Za-z]+$/i,
                            message: "Invalid Country",
                          },
                        })
                        }
                          type="text"
                          name="country"
                          id="country"
                          placeholder="Country"
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          defaultValue=""
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="state">State / province</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input
                        {...register("state", {
                          required: "State is required",
                          pattern: {
                            value: /^[A-Za-z]+$/i,
                            message: "Invalid State",
                          },
                        })}
                          name="state"
                          id="state"
                          placeholder="State"
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          defaultValue=""
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="District">District</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input
                        {...register("state", {
                          required: "District is required",
                          pattern: {
                            value: /^[A-Za-z]+$/i,
                            message: "Invalid District",
                          },
                        })}
                          name="state"
                          id="state"
                          placeholder="State"
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          defaultValue=""
                        />
                      </div>
                    </div>
                    <div className="md:col-span-1">
                      <label htmlFor="pincode">pincode</label>
                      <input
                      {...register("pincode", {
                        required: "Pincode is required",
                        pattern: {
                          value: /^[A-Za-z]+$/i,
                          message: "Invalid Pincode",
                        },
                        minLength: {
                          value: 6,
                          message: "your pincode should not less than 6 digits",
                        },
                        maxLength: {
                          value: 6,
                          message: "your pincode should noy more than 6 digits",
                        },
                      })}
                        type="text"
                        name="pincode"
                        id="pincode"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder=""
                        defaultValue=""
                      />
                    </div>
                    <div className="md:col-span-5">
                      <div className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="billing_same"
                          id="billing_same"
                          className="form-checkbox"
                        />
                        <label htmlFor="billing_same" className="ml-2">
                          My billing address is different than above.
                        </label>
                      </div>
                    </div>
                    <div className="md:col-span-2"></div>
                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end max-md:flex max-md:justify-center max-md:!items-center">
                        <button type="submit" className="bg-gray-500 hover:bg-black text-white font-bold py-2 px-4 rounded">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOutPage;
