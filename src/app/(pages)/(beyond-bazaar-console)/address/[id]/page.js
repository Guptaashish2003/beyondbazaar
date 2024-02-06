"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import InputBtn from "@/components/Form/InputBtn";
import SubmitButton from "@/components/Form/SubmitButton";
import { useParams } from "next/navigation";
import { usePostDataProtected } from "@/redux/api/usePostData";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { useGetDataProtected } from "@/redux/api/useGetData";
import { useUpdateDataProtected } from "@/redux/api/useUpdateData";
import { errorTostHandler } from "@/redux/api/errorTostHandler";
import GeoCoding from "@/backend/utils/bigDataGeo";


const CheckOutPage = () => {
  const {id} = useParams();
  const router = useRouter()
  const [lattitude,setLattitude] = useState();
  const [longitude,setLongitude] = useState();
  const [adress,setAdress] = useState();
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    name: Yup.string().required("Name is required"),
    number: Yup.string()
      .required("Number is required")
      .min(10, "Number must be at least 10 characters")
      .max(10, "Number must not exceed 10 characters"),
    street: Yup.string().required("Address is required"),

    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    District: Yup.string().required("District is required"),
    pincode: Yup.string()
      .required("Pincode is required")
      .min(6, "Pincode must be at least 6 characters")
      .max(6, "Pincode must not exceed 6 characters"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState,setValue } = useForm(formOptions);
  const { errors } = formState;
  const [loading,setLoading] = useState(false);
  const [loadingScreen,setLoadingScreen] = useState(false);
  const GetGoeCoding = async () => {
    try {
      const res = await GeoCoding( lattitude,longitude)
      if (res.success) {
        setAdress(res);
        toast.success(res.message);
  
      }
    } catch (error) {
      errorTostHandler(error);
    }
  
  }
  useEffect(()=>{setUserData();
  },[])
  console.log(adress,"adress" )
  const setUserData = async () => {
    try {
      if (id !== "add-new-address") {
        setLoadingScreen(true);
        const {data} = await useGetDataProtected(`/api/user/address/single/${id}`)
        setLoadingScreen(false);
        const address = data[0]
        for (const key in address) {
          setValue(key,address[key])
        }
      }
      
    } catch (error) {
      setLoadingScreen(true);
      errorTostHandler(error);
    }
  }
  const getLocation = () => {

  const geo = navigator.geolocation;
  geo.getCurrentPosition((useCoords) => {
    setLattitude(useCoords.coords.latitude);
    setLongitude(useCoords.coords.longitude);
  });
}



console.log(lattitude,longitude,"lattitude,longitude")
  async function onSubmit(data) {
    try {
          let res;
          setLoading(true);
      if (id === "add-new-address") {
         res = await usePostDataProtected("/api/user/address/add", data)
      }else{
        res = await useUpdateDataProtected(`/api/user/address/update/${id}`, data)
      }
      setLoading(false)
      if (res.success) {
        toast.success(res.message);
        router.back();

      }
      
    } catch (error) {
      setLoading(false)
      router.back();
      errorTostHandler(error);
      
    }

  }
if(loadingScreen){
  return(<Loading></Loading>)
}
  return (
    <>
      <div className="min-h-screen p-6 bg-gray-100 flex gap-1 items-center justify-center navMargin minScreen">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className="bg-white rounded shadow-lg mx-auto p-4 px-4 md:p-8 mb-6">
              <div className="w-2/3  flex  mx-auto justify-between max-md:flex-col max-md:items-center  text-center">
                <p className="">Time is Money Get Your Location Instant !!</p>
                <div className="inline-flex items-end">
                  <SubmitButton
                    onClick={getLocation}
                   className="bg-gray-500 hover:bg-black max-md:h-11 max-md:text-xs text-white font-bold py-2 px-4 rounded">
                    Get Location
                  </SubmitButton>
                </div>
              </div>

              <hr className="my-3 border border-slate-200" />
              <div className="text-gray-600 w-2/3 flex mx-auto gap-2 ">
                <p className="font-medium max-md:text-sm md text-lg">
                  Personal Details:
                </p>
                <p className="p-1 max-md:text-xs max-md:p-0">
                  Please fill out all the fields.
                </p>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit) }
                className="grid gap-4 gap-y-2 text-sm grid-cols-1 mx-auto w-2/3"
              >
                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label >Full Name</label>
                      <InputBtn
                        type="text"
                        name="name"
                        {...register("name", { required: true, maxLength: 20 })}
                        {...(errors.name && {
                          error: "Invalid name",
                        })}
                        id="name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        defaultValue=""
                        required
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs italic">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="md:col-span-5">
                      <label >Email Address</label>
                      <InputBtn
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
                      {errors.email && (
                        <p className="text-red-500 text-xs italic">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="md:col-span-5">
                      <label >Contact Number</label>
                      <InputBtn
                        {...register("number", {
                          required: "Number is required",
                          pattern: {
                            value: /^[A-Za-z0-9]+/i,
                            message: "Invalid Number",
                          },
                          minLength: {
                            value: 10,
                            message:
                              "your phone number should not less than 10 digits",
                          },
                          maxLength: {
                            value: 10,
                            message:
                              "your phone number should noy more than 10 digits",
                          },
                        })}
                        type="tel"
                        name="number"
                        id="number"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        defaultValue=""
                        placeholder="+91 99xxxxxx00"
                      />
                      {errors.number && (
                        <p className="text-red-500 text-xs italic">
                          {errors.number.message}
                        </p>
                      )}
                    </div>
                    <div className="md:col-span-3">
                      <label >Address / Street</label>
                      <InputBtn
                        {...register("street", {
                          required: "Address is required",
                          pattern: {
                            value: /^[A-Za-z]+$/i,
                            message: "Invalid Address",
                          },
                        })}
                        type="text"
                        name="street"
                        id="street"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        defaultValue=""
                        placeholder=""
                      />
                      {errors.street && (
                        <p className="text-red-500 text-xs italic">
                          {errors.street.message}
                        </p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label>City</label>
                      <InputBtn
                        {...register("city", {
                          required: "City is required",
                          pattern: {
                            value: /^[A-Za-z]+$/i,
                            message: "Invalid City",
                          },
                        })}
                        type="text"
                        name="city"
                        id="city"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        defaultValue=""
                        placeholder=""
                      />
                      {errors.city && (
                        <p className="text-red-500 text-xs italic">
                          {errors.city.message}
                        </p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label>Country / region</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <InputBtn
                          {...register("country", {
                            required: "Country is required",
                            pattern: {
                              value: /^[A-Za-z]+$/i,
                              message: "Invalid Country",
                            },
                          })}
                          type="text"
                          name="country"
                          id="country"
                          placeholder="Country"
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          defaultValue=""
                        />
                        {errors.country && (
                          <p className="text-red-500 text-xs italic">
                            {errors.country.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label>State / province</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <InputBtn
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
                        {errors.state && (
                          <p className="text-red-500 text-xs italic">
                            {errors.state.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label >District</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <InputBtn
                          {...register("District", {
                            required: "District is required",
                            pattern: {
                              value: /^[A-Za-z]+$/i,
                              message: "Invalid District",
                            },
                          })}
                          name="District"
                          id="District"
                          placeholder="State"
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          defaultValue=""
                        />
                        {errors.state && (
                          <p className="text-red-500 text-xs italic">
                            {errors.state.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="md:col-span-1">
                      <label >pincode</label>
                      <InputBtn
                        {...register("pincode", {
                          required: "Pincode is required",
                          pattern: {
                            value: /^[A-Za-z]+$/i,
                            message: "Invalid Pincode",
                          },
                          minLength: {
                            value: 6,
                            message:
                              "your pincode should not less than 6 digits",
                          },
                          maxLength: {
                            value: 6,
                            message:
                              "your pincode should noy more than 6 digits",
                          },
                        })}
                        type="text"
                        name="pincode"
                        id="pincode"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder=""
                        defaultValue=""
                      />
                      {errors.pincode && (
                        <p className="text-red-500 text-xs italic">
                          {errors.pincode.message}
                        </p>
                      )}
                    </div>
                    <div className="md:col-span-5">
                      <div className="inline-flex items-center">
                        <input
                          type="checkbox"
                          {...register("billing_same")}
                          id="billing_same"
                          className="form-checkbox"
                        />
                        <label className="ml-2">
                          My billing address is different than above.
                        </label>
                      </div>
                    </div>

                    <div className="md:col-span-2"></div>
                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end max-md:flex max-md:justify-center max-md:!items-center">
                        <SubmitButton
                        loading={loading}
                        value={id === "add-new-address"?"Add Address":"Edit Address"}
                          className="bg-gray-500 hover:bg-black text-white font-bold py-2 px-4 rounded"
                        >
                      
                        </SubmitButton>
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
