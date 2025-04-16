export const initialStore = () => {
  return {
      username: ''
  };
};

export default function storeReducer(store, action = {}) {
  switch(action.type) {
      case 'register_username':
          return {
              ...store,
              username: action.content
          };
      default:
          return store;
  }
}