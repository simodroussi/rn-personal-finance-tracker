import React, { useReducer, createContext } from 'react';
import { addCategoryAction, addExpenseAction } from './actions';
import { categoriesReducer } from './categoryReducer';
import { expensesReducer } from './expensesReducer';

export const GlobalContext = createContext({});

const expensesInitialState = [];

const categoriesInitialState = [
  { id: 1, name: 'Food' },
  { id: 2, name: 'Transport' },
  { id: 3, name: 'Entertainment' },
  { id: 4, name: 'Clothes' },
  { id: 5, name: 'Health' },
  { id: 6, name: 'Other' },
];

export const Provider = ({ children }) => {
  const [expenses, expensesDispatch] = useReducer(
    expensesReducer,
    expensesInitialState
  );
  const [categories, categoriesDispatch] = useReducer(
    categoriesReducer,
    categoriesInitialState
  );

  const addExpense = (expense) => expensesDispatch(addExpenseAction(expense));
  const addCategory = (category) =>
    categoriesDispatch(addCategoryAction(category));

  return (
    <GlobalContext.Provider
      value={{ expenses, categories, addExpense, addCategory }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
