import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, COMPLETE_ITEM, ITEMS_LOADING } from "../actions/types";

const initialState = {
  items: [],
  loading: false
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_ITEMS:
      console.log(action.payload)
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items]
      };
    case COMPLETE_ITEM:
      const index = state.items.findIndex((item) => item._id == action.payload.id)

      return {
        ...state,
        items: state.items.map(
          (item, i) => i === index ? {...item, completed: action.payload.isComplete} 
                                   : item
        )
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };
    default: 
      return state
  }
}