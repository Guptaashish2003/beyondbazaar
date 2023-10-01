

const initialState = {
  selectedThumbnail: 0,
};

const changeImg = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SELECTED_THUMBNAIL":
      return {
        ...state,
        selectedThumbnail: action.payload,
      };
      default:
        return state;
      }
};

export default changeImg;
