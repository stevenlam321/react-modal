import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ScrollView } from 'react-native-gesture-handler';
import { Button} from 'react-native-elements';
import Modal from 'react-native-modal';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function ModalScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned,setScanned] = useState(false);
  console.log(scanned);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`${data}`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>  
        <Modal isVisible={scanned} style={{backgroundColor:'red'}}>
          <View style={{ flex: 1 }}>
            <Text>I am the modal content!</Text>
            <Text>I am the modal content!</Text>
            <Text>I am the modal content!</Text>
            <Text>I am the modal content!</Text>
            <Text>I am the modal content!</Text>
            <Text>I am the modal content!</Text>
            <Text>I am the modal content!</Text>
            <Text>I am the modal content!</Text>
            <Button title="Hide modal" onPress={()=>setScanned(false)} />
          </View>
        </Modal>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{width:200,height:200}}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} 
      
   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  }
});
