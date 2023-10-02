export const incNum = () => {
    return {
        type: 'INCREMENT',   
    }
}
export const decNum = () => {
    return {
        type: 'DECREMENT',   
    }
}

//  Image changeing



  
  export const setSelectedThumbnail = (index) => ({
    type: "SET_SELECTED_THUMBNAIL",
    payload: index,
  });