import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import nfcManager from 'react-native-nfc-manager';

export default function App() {
  const [isNfcSupported, setIsNfcSupported] = useState<boolean | null>(null)

  useEffect(()=>{
    const checkSupport = async () => {
      const supports = await nfcManager.isSupported()
      setIsNfcSupported(supports)
    }
    checkSupport()
  },[])
  return (
    <View style={styles.container}>
      <Text>{isNfcSupported ? "Your Device Supports NFC" : "Your Device doesn't support NFC"}</Text>
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
