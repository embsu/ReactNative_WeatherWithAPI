import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Position from './components/Position';

export default function App() {
  return (
    <View style={styles.container}>

      <Text style={styles.header}>Current weather</Text>
      
      <Position />
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D4E6F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  }
});
