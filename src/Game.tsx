import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import nfcManager, { NfcEvents } from 'react-native-nfc-manager'

const Game = () => {
    useEffect(()=>{
        nfcManager.setEventListener( NfcEvents.DiscoverTag, (tag:any)=>{
            console.warn(tag)
        })
        return ()=> nfcManager.setEventListener(NfcEvents.DiscoverTag, null)
    },[])
    
    const scanTag = async () =>{
        await nfcManager.registerTagEvent()
    }

  return (
    <View>

      <Text>NFC Game</Text>
      <TouchableOpacity onPress={scanTag}>
        Start Game
      </TouchableOpacity>
    </View>
  )
}

export default Game

const styles = StyleSheet.create({})