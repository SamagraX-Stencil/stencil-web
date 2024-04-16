export const configReducer = (state: any, action: any) => {
  console.log(JSON.stringify(state))
  const { where, which, newValue } = action.payload
  switch (action.type) {
    case 'UPDATE_CONFIG':
      return {
        ...state,
        component: {
          ...state.component,
          [where]: {
            ...state.component[where],
            [which]: newValue,
          },
        },
      }
    default:
      return state
  }
}
