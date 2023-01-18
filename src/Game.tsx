import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import nfcManager, { NfcEvents } from 'react-native-nfc-manager'



const Game = () => {
  const [duration, setDuration] = useState<number | null>(null)
  const [startTime, setStartTime] = useState<number | null>(null)
    useEffect(()=>{
      let count = 5
        nfcManager.setEventListener( NfcEvents.DiscoverTag, (tag:any)=>{
            count--
            nfcManager.setAlertMessage(`Remaining ${count} tags`)
            console.warn(tag)
        })
        if(count <=0 && startTime){
          nfcManager.unregisterTagEvent().catch(()=>0)
           setStartTime(0)
          setDuration(new Date().getTime() - startTime)
        }
        return ()=> nfcManager.setEventListener(NfcEvents.DiscoverTag, null)
    },[startTime])
    
    const scanTag = async () =>{
      setStartTime(new Date().getTime())
        await nfcManager.registerTagEvent()
        setDuration(0)
    }

  return (
    <View>

      <Text>NFC Game</Text>
      {duration && <Text>{duration} ms</Text>}
      <TouchableOpacity onPress={scanTag}>
        Start Game
      </TouchableOpacity>
    </View>
  )
}

export default Game

const styles = StyleSheet.create({})