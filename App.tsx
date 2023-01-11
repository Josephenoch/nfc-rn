import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import nfcManager from 'react-native-nfc-manager';
import Game from './src/game';

export default function App() {
  const [isNfcSupported, setIsNfcSupported] = useState<boolean | null>(null)

  useEffect(()=>{
    const checkSupport = async () => {
      const supported = await nfcManager.isSupported()
      if(supported) await nfcManager.start()
      setIsNfcSupported(supported)
    }
    checkSupport()
  },[])
  return (
    <View style={styles.container}>
     {isNfcSupported ? <Game/> : "Your Device doesn't support NFC"}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
