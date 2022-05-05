import React, { useState, useContext } from 'react';
import { Text, Button, TextInput, Input } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';
import { GlobalContext } from '../context/context';

const AddCategory = ({ handleAdd }) => {
  const [category, setCategory] = useState('');
  const { addCategory } = useContext(GlobalContext);
  const navigation = useNavigation();

  const handleAddCategory = () => {
    const newCategory = { id: uuid.v4(), name: category };
    if (category === '') {
      return;
    } else {
      addCategory(newCategory);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text h4>Add a category</Text>
      <Input
        style={styles.input}
        placeholder="Category name"
        onChangeText={(text) => setCategory(text)}
      />
      <Button
        style={styles.button}
        title="Add"
        onPress={() => handleAddCategory()}
      />
    </View>
  );
};

export default AddCategory;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
  },
  input: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#228CDB',
  },
});
