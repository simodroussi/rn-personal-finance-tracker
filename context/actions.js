// Expenses
export const addExpenseAction = (expense) => {
  return {
    type: 'ADD_EXPENSE',
    payload: expense,
  };
};

// Categories
export const addCategoryAction = (category) => {
  return {
    type: 'ADD_CATEGORY',
    payload: category,
  };
};
