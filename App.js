import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import Constants from 'expo-constants'
import { AntDesign } from '@expo/vector-icons';
import { useFonts, 
  Lato_400Regular,
  Lato_900Black,
} from '@expo-google-fonts/lato';

const image = require('./resources/bg.jpg');


export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Lato_400Regular,
    Lato_900Black,
  });

  if (!fontsLoaded && !fontError){
    return null;
  }
 
  return (
    <ScrollView style={styles.container}>

        <ImageBackground source={image} style={styles.image}>
          <View style = {styles.coverView}>
            <Text style = {styles.text}>Lista de Tarefas</Text>
          </View>
        </ImageBackground>

        <View style = {styles.tarefaSingle}>

            <View style = {{flex: 1, width: '100%', padding: 10}}>
              <Text>
                Minha tarefa número 1 do dia xx do mês xxx
              </Text>
            </View>

            <View style = {{alignItems: 'flex-end', flex: 1, padding: 10}}>
              <TouchableOpacity>
                <AntDesign name="minuscircleo" size={24} color="black" />
              </TouchableOpacity>
            </View>

          </View>
          
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    
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
  }
});