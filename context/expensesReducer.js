export const expensesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.payload];
  }
};
