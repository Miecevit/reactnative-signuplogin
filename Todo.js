import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';

export default function Todo() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);
  
  function getRandomColor(){
    const letters = '0123456789ABCDEF';
    let color = '#';

    for(let i = 0; i < 6; i++ ){
      color += letters[Math.floor(Math.random()*16)]; 
    }

    return color;
  }

  function addTodo() {
    if(input.trim() !== ''){
      setTodos([
        ...todos, 
        { id: Date.now().toString(), 
          text: input.trim(), 
          bgColor: getRandomColor(), },
        ]);
      setInput('');
    }
  }

  function deleteTodo(id) {

    Alert.alert('Delete Todo', 
                'Bu todoyu silmek istediğinize emin misiniz?', 
                [
                  {text: 'İptal'}, 
                  {text:'OK', onPress: () => setTodos(todos.filter((todo) => todo.id !== id)) }])


  }

  function resetList(){

    Alert.alert('Reset List',
                'Listeyi temizlemek istediğiniz emin misiniz?',
                [
                  {text: 'Hayır'},
                  {text: 'Evet', onPress: () => setTodos([])}
                ])

  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Yapılacak Gir"
        value={input}
        onChangeText={setInput}
      />
      <View style={styles.butonView}>
      <TouchableOpacity onPress={addTodo}>
        <Text style={styles.eklebutton}>EKLE</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={resetList}>
        <Text style={styles.resetbutton}>Temizle</Text>
      </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.todo, {backgroundColor: item.bgColor}]}>
            <Text style={styles.todoText}> {item.text} </Text>
            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <Text style={styles.deleteButton}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  eklebutton: {
    fontSize: 18,
    color: 'blue',
    marginBottom: 20,
  },
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingBottom: 10,
    marginBottom: 10,
  },
  todoText: {
    fontSize: 18,
  },
  deleteButton: {
    fontSize: 18,
    color: 'red',
  },
  butonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resetbutton: {
    fontSize: 18,
    color: 'red',
  },
});