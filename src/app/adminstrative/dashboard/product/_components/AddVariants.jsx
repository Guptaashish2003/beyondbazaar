import React, { useState } from "react";
import InputBtn from "@/components/Form/InputBtn";
import SubmitButton from "@/components/Form/SubmitButton";
import Modal from "@/components/Modal/Modal";



const AddVarients = ({ subCategory, btnClass,rows,setRows }) => {
  const addVarients = async () => {};
  console.log(typeof subCategory);
  const [isColor , setIsColor] = useState(false);

  const handleColor = () => {
    setIsColor(!isColor);
    if(!isColor){
      // add columns with  name color
      const newColoumnWithColor = rows.map((row) => {
        return {...row, color: ''};
      });
      setRows(newColoumnWithColor);
    }
    else{
      // remove columns with  name color
      const newColoumnWithOutColor = rows.map((row) => {
        const {color, ...rest} = row;
        return rest;
      });
      setRows(newColoumnWithOutColor);
    } 
  }

  // Handle adding a new row
  const addRow = () => {
    setRows([...rows, { varientType: '', price: '', stockAvailable: false,stock:0 }]);
  };

  // Handle input change for the table fields
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newRows = [...rows];
    newRows[index][name] = value;
    setRows(newRows);
  };
  const keys = Object.keys(rows[0]);

  return (
    <div>
      <Modal btnClass={`${btnClass} px-4`} btnName="Add SubCategory">
        <div className="flex flex-col gap-y-2">
          <div>
            {/* make toggel */}
            <SubmitButton  value={isColor?"Remove color":"Add Color"} onClick={handleColor}></SubmitButton>
            <table border="1">
              <thead>
                <tr>
                  {
                    keys.map((key, index) => {
                      return <th key={index}>{key}</th>
                    })
                  }
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    
                  </tr>
                ))}
              </tbody>
            </table>
            <SubmitButton value="Add Row"  className="bg-[--first-color] rounded-sm text-white py-2 hover:scale-101 duration-300" onClick={addRow}></SubmitButton>
          </div>

          <SubmitButton
            value="Submit"
            onClick={addVarients}
            className="bg-[--first-color] rounded-sm text-white py-2 hover:scale-105 duration-300"
          ></SubmitButton>
        </div>
      </Modal>
    </div>
  );
};

export default AddVarients;