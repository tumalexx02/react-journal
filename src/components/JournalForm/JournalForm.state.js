export const INITIAL_STATE = {
  isValid: {
    title: true,
    date: true,
    text: true
  },
  values: {
    title: '',
    date: '',
    text: '',
    tag: '',
    userId: 1
  },
  isFormReadyToSubmit: false
}

export function formReducer(state, action) {
  switch(action.type) {
    case 'RESET_VALIDITY':
      return {...state, isValid: INITIAL_STATE.isValid};
    case 'SUBMIT': {
      const titleValidity = state.values.title?.trim().length;
      const dateValidity = state.values.date;
      const textValidity = state.values.text?.trim().length;

      return {
        ...state,
        isValid: {
          title: titleValidity,
          date: dateValidity,
          text: textValidity
        },
        isFormReadyToSubmit: titleValidity && dateValidity && textValidity
      }
    }
    case 'CLEAR':
      return {...state, values: INITIAL_STATE.values, isFormReadyToSubmit: false}
    case 'SET_VALUE': 
      return {...state, values: {...state.values, ...action.payload}}
  }
}