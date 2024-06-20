import configObj from '@samagra-x/stencil-config-manager'
import AppConfig from '../types/appConfigType'

interface UpdateConfigAction {
  type: 'UPDATE_CONFIG' | 'RESET_VALUE'
  payload: {
    where: keyof AppConfig['component']
    which: string
    newValue: string | boolean | number
  }
}

export const configReducer = (state: AppConfig, action: UpdateConfigAction) => {
  console.log(JSON.stringify(action))
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
    case 'RESET_VALUE':
      return configObj
    default:
      return state
  }
}
