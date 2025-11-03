import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

export default function BigButton({ label, onPress, style }:{label:string; onPress:()=>void; style?:ViewStyle}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, style]} activeOpacity={0.8}>
      <Text style={styles.txt}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn:{ backgroundColor:'#6366F1', paddingVertical:18, paddingHorizontal:32, borderRadius:16, alignItems:'center', shadowColor:'#6366F1', shadowOffset:{width:0,height:6}, shadowOpacity:0.3, shadowRadius:10, elevation:6 },
  txt:{ fontSize:22, fontWeight:'800', color:'#fff', letterSpacing:0.5 }
});

