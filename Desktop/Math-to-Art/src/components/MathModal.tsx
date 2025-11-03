import React, { useState, useRef, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { MathQuestion } from '../types';

export default function MathModal({
  visible, question, onClose, onCorrect
}:{visible:boolean; question:MathQuestion; onClose:()=>void; onCorrect:()=>void;}) {
  const [ans, setAns] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const shake = () => {
    setErrorMsg('❌ Try again!');
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start(() => {
      setTimeout(() => setErrorMsg(''), 2000);
    });
  };

  const press = (v:string) => {
    if (v==='C') { setAns(''); setErrorMsg(''); }
    else if (v==='←') { setAns(ans.slice(0,-1)); setErrorMsg(''); }
    else if (v==='OK'){
      if (ans.trim() === question.answer.trim()) { 
        // Celebration animation before calling onCorrect
        const celebrate = () => {
          // Visual feedback
          setErrorMsg('🎉 Correct!');
          setTimeout(() => {
            setErrorMsg('');
            onCorrect(); 
            setAns('');
          }, 500);
        };
        celebrate();
      } else {
        shake();
      }
    } else setAns(ans + v);
  };

  const keys = ['1','2','3','4','5','6','7','8','9','0','←','C','OK'];

  // Reset error when modal closes
  useEffect(() => {
    if (!visible) {
      setAns('');
      setErrorMsg('');
      shakeAnim.setValue(0);
    }
  }, [visible, shakeAnim]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.emoji}>🧮</Text>
            <Text style={styles.prompt}>{question.prompt}</Text>
          </View>
          <Animated.View style={[styles.inputContainer, { transform: [{ translateX: shakeAnim }] }]}>
            <Text style={styles.input}>{ans || '?'}</Text>
            {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
          </Animated.View>
          <View style={styles.grid}>
            {keys.map(k=>(
              <TouchableOpacity 
                key={k} 
                onPress={()=>press(k)} 
                style={[styles.key, k==='OK' ? styles.ok : null, (k==='←' || k==='C') ? styles.specialKey : null]}
                activeOpacity={0.7}
              >
                <Text style={[styles.ktxt, k==='OK' ? styles.oktxt : null]}>{k}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
            <Text style={styles.close}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop:{ flex:1, backgroundColor:'rgba(0,0,0,0.5)', alignItems:'center', justifyContent:'center', padding:20 },
  card:{ width:'100%', maxWidth:400, backgroundColor:'#fff', borderRadius:24, padding:24, alignItems:'center', shadowColor:'#000', shadowOffset:{width:0,height:10}, shadowOpacity:0.25, shadowRadius:20, elevation:10 },
  header:{ alignItems:'center', marginBottom:20 },
  emoji:{ fontSize:48, marginBottom:12 },
  prompt:{ fontSize:28, fontWeight:'800', color:'#1E293B', textAlign:'center' },
  inputContainer:{ width:'100%', marginBottom:20, alignItems:'center' },
  input:{ fontSize:32, minHeight:50, paddingVertical:12, paddingHorizontal:16, backgroundColor:'#F1F5F9', borderRadius:12, textAlign:'center', fontWeight:'700', color:'#1E293B', borderWidth:2, borderColor:'#E2E8F0', width:'100%' },
  errorText:{ marginTop:8, fontSize:18, fontWeight:'700', color:'#EF4444', textAlign:'center' },
  grid:{ flexDirection:'row', flexWrap:'wrap', justifyContent:'center', marginBottom:12 },
  key:{ width:75, height:60, borderRadius:14, backgroundColor:'#F1F5F9', alignItems:'center', justifyContent:'center', margin:5, shadowColor:'#000', shadowOffset:{width:0,height:2}, shadowOpacity:0.1, shadowRadius:4, elevation:3 },
  ktxt:{ fontSize:22, fontWeight:'700', color:'#1E293B' },
  ok:{ backgroundColor:'#10B981', shadowColor:'#10B981', shadowOpacity:0.3 },
  oktxt:{ color:'#fff' },
  specialKey:{ backgroundColor:'#FED7AA' },
  closeBtn:{ marginTop:8, paddingVertical:8, paddingHorizontal:20 },
  close:{ color:'#64748B', fontSize:16, fontWeight:'600' }
});

