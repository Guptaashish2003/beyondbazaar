// data.js
import * as Yup from "yup";

// Validation schema
export const validationSchema = Yup.object().shape({
  productName: Yup.string().required("Name is required"),
  productPrice: Yup.number().required("Price is required"),
  productQuantity: Yup.number().required("Quantity is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  productCategory: Yup.string().required("Category is required"),
  productAvailable: Yup.string().required("Stock Availability is required"),
});

// Form data array
export const formdata = (register, errors) => [
  {
    type: "text",
    value: "Enter Product Name",
    id: "name",
    name: "productName",
    register: {
      ...register("productName", {
        required: "Name is required",
      }),
    },
    errorMessage: errors?.productName?.message,
  },
  {
    type: "number",
    value: "Enter Product price",
    id: "price",
    name: "productPrice",
    register: {
      ...register("productPrice", {
        required: "Price is required",
      }),
    },
    errorMessage: errors?.productPrice?.message,
  },
  {
    type: "number",
    value: "Enter Product Quantity",
    id: "quantity",
    name: "productQuantity",
    register: {
      ...register("productQuantity", {
        required: "Quantity is required",
      }),
    },
    errorMessage: errors?.productQuantity?.message,
  },
  {
    id: "dropdown",
    name: "productAvailable",
    type: "dropdown",
    label: "Product Available",
    option: ["true", "false"],
    register: {
      ...register("productAvailable", {
        required: "Stocks availability is required",
      }),
    },
    labelClass: "absolute top-6",
    errorMessage: errors?.productAvailable?.message,
  },
  {
    type: "text",
    value: "Enter Seo Title",
    id: "title",
    name: "title",
    register: {
      ...register("title", {
        required: "Title is required",
      }),
    },
    errorMessage: errors?.title?.message,
  },
  {
    type: "text",
    value: "Enter Seo Description",
    id: "description",
    name: "description",
    register: {
      ...register("description", {
        required: "Description is required",
      }),
    },
    errorMessage: errors?.description?.message,
  },
];
