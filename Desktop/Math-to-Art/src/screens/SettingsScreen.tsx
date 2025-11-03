import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SettingsScreen(){
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={{textAlign:'center', color:'#6B7280'}}>Coming soon</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{ flex:1, paddingTop:64 },
  title:{ fontSize:28, fontWeight:'900', textAlign:'center', marginBottom:8 },
});

