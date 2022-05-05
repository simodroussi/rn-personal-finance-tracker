import React, { useContext, useRef, useState } from 'react';
import { View, SafeAreaView, StyleSheet, Picker, Keyboard } from 'react-native';
import { Text, Button, Input, ListItem, Divider } from 'react-native-elements';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';
import { GlobalContext } from '../context/context';

const Home = () => {
  const expenseNameRef = useRef();
  const [amount, setAmount] = useState(0);
  const [expenseName, setExpenseName] = useState('');
  const [category, setCategory] = useState('other');
  const { expenses, categories, addExpense, addCategory } =
    useContext(GlobalContext);

  const handleExpenseNameChange = (value) => {
    setExpenseName(value);
  };

  const handleAmountChange = (value) => {
    setAmount(parseFloat(value));
  };

  const handleAddExpense = () => {
    const newExpense = {
      id: uuid.v4(),
      expenseName,
      amount,
      category,
    };
    if (amount === 0 || expenseName === '' || category === '') {
      return;
    } else {
      addExpense(newExpense);
      setAmount('');
      setExpenseName('');
      Keyboard.dismiss();
      expenseNameRef.current.focus();
    }
  };

  const calculateTotal = () => {
    return expenses
      .reduce((acc, curr) => acc + curr.amount, 0)
      .toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Total amount of expenses:</Text>
      <Text style={styles.amount}>${calculateTotal()}</Text>
      <TextInput
        ref={expenseNameRef}
        style={styles.input}
        placeholder="ex. meat, milk, etc."
        value={expenseName}
        onChangeText={(value) => handleExpenseNameChange(value)}
      />
      <TextInput
        style={styles.input}
        placeholder="amount"
        value={amount}
        onChangeText={(value) => handleAmountChange(value)}
      />
      <Picker
        style={styles.picker}
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        {categories.map((category) => (
          <Picker.Item
            key={category.id}
            label={category.name}
            value={category.name}
          />
        ))}
      </Picker>
      <Button
        style={styles.button}
        title="Add"
        onPress={() => handleAddExpense()}
      />
      <ScrollView style={styles.expenses}>
        {categories.map((category) => (
          <View key={category.key}>
            <Text style={styles.category} key={category?.id}>
              {category?.name}
            </Text>
            {expenses
              .filter((expense) => expense.category === category.name)
              .map((expense) => (
                <ListItem.Content key={expense.id}>
                  <ListItem.Subtitle>
                    {expense.expenseName} $
                    {expense.amount.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </ListItem.Subtitle>
                </ListItem.Content>
              ))}
            <Divider />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {},
  amount: {},
  button: {
    backgroundColor: '#228CDB',
  },
  picker: {
    height: 50,
  },
  expenses: {},
  category: {},
});
