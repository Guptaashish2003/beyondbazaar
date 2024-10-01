"use client";
import React, { Fragment, useEffect, useState } from "react";
import InputBtn from "@/components/Form/InputBtn";
import SubmitButton from "@/components/Form/SubmitButton";
import Modal from "@/components/Modal/Modal";
import { IoIosAddCircle } from "react-icons/io";

const Addvariants = ({ btnClass, rows, setRows }) => {
  const [isColor, setIsColor] = useState(false);
  const [val,setVal] = useState({});
  

  useEffect(() => {
    if (isColor) {
      setVal({
        color: "",
        price: 0,
        stock: 0,
        isAvailable: true,
        variantImage: "",
      })
      setRows([...rows, { variantType: "", variantDetails: [{
        color: "",
        price: 0,
        stock: 0,
        isAvailable: true,
        variantImage: "",
      }] }]);
    } else {
      setVal({ price: 0, stock: 0, isAvailable: true, variantImage: "" });
      setRows([...rows, { variantType: "", variantDetails:[{ price: 0, stock: 0, isAvailable: true, variantImage: "" }] }]);
    }
  }, [isColor]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        variantType: "",
        variantDetails: [val],
      },
    ]);
  };
console.log(isColor,"isColor")
  // Handle adding a new variant detail row
  const addvariantDetailRow = (index) => {
    const newRows = [...rows];
    newRows[index].variantDetails.push(val);
    setRows(newRows);
  };

  const handleInputChange = (index, event, variantIndex = null) => {
    const { name, value } = event.target;
    const newRows = [...rows];

    if (variantIndex !== null) {
      if (name === "price" || name === "stock") {
        newRows[index].variantDetails[variantIndex][name] = parseInt(value);
      } else {
        newRows[index].variantDetails[variantIndex][name] = value;
      }
    } else {
      newRows[index][name] = value;
    }
    setRows(newRows);
  };

  console.log(rows);
  const header = ["variantType", "variantDetails"];
  const DetailHeader = [
    `${isColor ? "color" : ""}`,
    "price",
    "isAvailable",
    "stock",
  ];

  return (
    <div>
      <Modal btnClass={`${btnClass} px-4`} btnName="Add SubCategory">
        <div className="flex mx-6 my-3 gap-x-4 px-3 w-full justify-evenly">
          <label className="inline-flex w-1/2 items-center mb-5 cursor-pointer my-6">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              onChange={() => setIsColor(!isColor)}
            />
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              with color
            </span>
            <div className="relative mx-2 w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-gray-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-gray-800"></div>
          </label>
        </div>
        <div className="flex flex-col gap-y-2">
          <h1 className="text-lg font-bold">Add Variants</h1>
          <div>
            <table border="1">
              <thead>
                <tr>
                  {header.map((key, index) => {
                    return <th key={index}>{key}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <InputBtn
                        name="variantType"
                        value={row.variantType}
                        onChange={(event) => handleInputChange(index, event)}
                      />
                    </td>
                    <td>
                      <table border="1">
                        <thead>
                          <tr>
                            {DetailHeader.map((key, index) => (
                              <th key={index}>{key}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {row.variantDetails.map((varitant, idx) => (
                            <tr key={idx}>
                              {isColor && (
                                <td>
                                  <InputBtn
                                    name="color"
                                    value={varitant.color}
                                    onChange={(event) =>
                                      handleInputChange(index, event, idx)
                                    }
                                  />
                                </td>
                              )}
                              <td>
                                <InputBtn
                                  name="price"
                                  value={varitant.price}
                                  type="number"
                                  onChange={(event) =>
                                    handleInputChange(index, event, idx)
                                  }
                                />
                              </td>
                              <td>
                                <InputBtn
                                  name="isAvailable"
                                  value={varitant.isAvailable}
                                  onChange={(event) =>
                                    handleInputChange(index, event, idx)
                                  }
                                />
                              </td>
                              <td>
                                <InputBtn
                                  name="stock"
                                  type="number"
                                  value={varitant.stock}
                                  onChange={(event) =>
                                    handleInputChange(index, event, idx)
                                  }
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                    <td>
                      <IoIosAddCircle
                        onClick={() => addvariantDetailRow(index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <SubmitButton
            value="Add Row"
            className="bg-[--first-color] rounded-sm text-white py-2 hover:scale-101 duration-300"
            onClick={addRow}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Addvariants;
