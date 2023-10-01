const initialState = 0;
const minValue = 0;
const maxValue = 10;

export default function incDec(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state < maxValue ? state + 1 : state;
    case 'DECREMENT':
      return state > minValue ? state - 1 : state;
    default:
      return state;
  }
}
