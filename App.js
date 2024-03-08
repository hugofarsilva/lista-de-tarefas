import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { 
  StyleSheet, 
  Text, 
  View, 
  ImageBackground, 
  TouchableOpacity, 
  TouchableHighlight,
  Modal,
  TextInput,
  ScrollView,
  Button,
} from 'react-native';
import Constants from 'expo-constants'
import { AntDesign } from '@expo/vector-icons';
import { useFonts, 
  Lato_400Regular,
  Lato_900Black,
} from '@expo-google-fonts/lato';


export default function App() {
  
  const image = require('./resources/bg.jpg');

  const [tasks, setTasks] = useState([]);

  const [modal, setModal] = useState(false);
  const [currentTask, setCurrentTask] = useState('');
  const [checkboxState, setCheckboxState] = useState(false);

  let [fontsLoaded, fontError] = useFonts({
    Lato_400Regular,
    Lato_900Black,
  });

  useEffect(() => {
    (async () => {
      try {
        let currentTask = await AsyncStorage.getItem('tasks');
        if(currentTask == null)
          setTasks([]);
        else
          setTasks(JSON.parse(currentTask));
      } catch (error) {
        
      }
    })();
  },[])

  if (!fontsLoaded && !fontError){
    return null;
  }

  function deletTask(id) {
    
    let newTask = tasks.filter(function(val){
      return val.id != id;
    });
    setTasks(newTask);

    (async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(newTask));
        //console.log('chamado')
      } catch (error) {
        
      }
    })();
  }
   
  function addTask() {
    setModal(!modal);
    let id = 0;
    if (tasks.length > 0) {
      id = tasks[tasks.length - 1].id + 1;
    }
    let task = {id:id, task:currentTask};
    setTasks([...tasks, task]);

    (async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify([...tasks, task]));
        
      } catch (error) {
        
      }
    })();
  }
  return (
    <ScrollView style={styles.container}>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput onChangeText={text => setCurrentTask(text)} 
              autoFocus={true}>
            </TextInput>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => addTask()}
            >
              <Text style={styles.textStyle}>Adicionar Tarefa</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <ImageBackground source={image} style={styles.image}>
        <View style = {styles.coverView}>
          <Text style = {styles.text}>Lista de Tarefas</Text>
        </View>
      </ImageBackground>

      {
        tasks.map(function(val) {
          return(
            <View style = {styles.tarefaSingle}>
                <View style = {{flex: 1, width: '100%', padding: 10}}>
                  <Text>
                
                    <BouncyCheckbox
                      size={25}
                      fillColor="red"
                      unfillColor="#FFFFFF"
                      text={val.task}
                      iconStyle={{ borderColor: "red" }}
                      innerIconStyle={{ borderWidth: 2 }}
                      textStyle={{ fontFamily: "Lato_400Regular" }}
                      onPress={() => setCheckboxState(!checkboxState)}
                    />
                  </Text>
                </View>

                <View style = {{alignItems: 'flex-end', flex: 1, padding: 10}}>
                  <TouchableOpacity onPress={()=> deletTask(val.id)}>
                    <AntDesign name="minuscircleo" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
          );
        })
      }
     
      <TouchableOpacity style={styles.touchableOpacity} onPress={()=> setModal(true)}>
        <Text style={{
          padding: 10, 
          textAlign: 'center', 
          color: 'white',
          fontFamily: 'Lato_900Black'}}>
          Nova Tarefa
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    
  },

  touchableOpacity: {
    width: 200,
    padding: 8,
    backgroundColor: 'gray',
    marginTop: 20,
    alignSelf: 'center'
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: 80,
    
  },

  text: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Lato_900Black'
    
  },

  checkbox: {
    margin: 8,
  },

  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  coverView: {
    width: '100%',
    height: 80,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  tarefaSingle: {
    marginTop: 30,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    flexDirection: 'row',
    paddingBottom: 10
  },

  //modal styles
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'rgba(0,0,0,0.5)'
  },
  
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex:5
  },

  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }

});