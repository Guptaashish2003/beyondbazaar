"use client";
import React, { Fragment, useState } from "react";
import InputBtn from "@/components/Form/InputBtn";
import SubmitButton from "@/components/Form/SubmitButton";
import Modal from "@/components/Modal/Modal";
import { IoIosAddCircle } from "react-icons/io";

const AddVarients = ({ btnClass,rows, setRows }) => {



  const addRow = () => {
    setRows([
      ...rows,
      {
        variantType: "",
        varientDetails: [{ color: "", price: "", stock: "", isAvailable: true, variantImage: "" }],
      },
    ]);
  };

  // Handle adding a new variant detail row
  const addVarientDetailRow = (index) => {
    const newRows = [...rows];
    newRows[index].varientDetails.push({
      color: "",
      price: "",
      stock: "",
      isAvailable: true,
      variantImage: "",
    });
    setRows(newRows);
  };

  const handleInputChange = (index, event, variantIndex = null) => {
    const { name, value } = event.target;
    const newRows = [...rows];

    if (variantIndex !== null) {
      newRows[index].varientDetails[variantIndex][name] = value;
    } else {
      newRows[index][name] = value;
    }
    setRows(newRows);
  };


console.log(rows);
  const header = ["variantType", "varientDetails"];
  const DetailHeader = ["color", "price", "isAvailable", "stock"];

  return (
    <div>
      <Modal btnClass={`${btnClass} px-4`} btnName="Add SubCategory">
        <div className="flex flex-col gap-y-2">
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
                          {row.varientDetails.map((varitant, idx) => (
                            <tr key={idx}>
                              <td>
                                <InputBtn
                                  name="color"
                                  value={varitant.color}
                                  onChange={(event) => handleInputChange(index, event, idx)}
                                />
                              </td>
                              <td>
                                <InputBtn
                                  name="price"
                                  value={varitant.price}
                                  onChange={(event) => handleInputChange(index, event, idx)}
                                />
                              </td>
                              <td>
                                <InputBtn
                                  name="isAvailable"
                                  value={varitant.isAvailable}
                                  onChange={(event) => handleInputChange(index, event, idx)}
                                />
                              </td>
                              <td>
                                <InputBtn
                                  name="stock"
                                  value={varitant.stock}
                                  onChange={(event) => handleInputChange(index, event, idx)}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                    <td>
                      <IoIosAddCircle onClick={() => addVarientDetailRow(index)} />
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

export default AddVarients;
