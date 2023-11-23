import React from 'react'
import Content from '@/components/Form/Content';
import Modal from '@/components/Modal/Modal';


const page = () => {
  const changeName = () => {
    console.log("change name")
    return(
      <Modal>
        <form>
          <input type="text" />
          <button type="submit">save changes</button>
        </form>
      </Modal>
    )
  };
  return (
    <div className="border-2 border-solid border-gray-500 mt-32 w-1/2 mx-auto">
      <Content title={"name"} btnName={"edit"} description={"Ashish Gupta"} onClick={changeName}/>
      <Content title={"name"} btnName={"edit"} description={"Ashish Gupta"} />
      <Content title={"name"} btnName={"edit"} description={"Ashish Gupta"} />
      <Content title={"name"} btnName={"edit"} description={"Ashish Gupta"} />
      <Content title={"name"} btnName={"edit"} description={"Ashish Gupta"} />
      <Content title={"name"} btnName={"edit"} description={"Ashish Gupta"} />

    </div>
  )
}

export default page