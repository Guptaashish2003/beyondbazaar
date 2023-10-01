const initialState = 0;
const minValue = 0;
const maxValue = 10;

export default function incDec(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      // Check if the value is less than the maximum value before incrementing
      return state < maxValue ? state + 1 : state;
    case 'DECREMENT':
      // Check if the value is greater than the minimum value before decrementing
      return state > minValue ? state - 1 : state;
    default:
      return state;
  }
}
