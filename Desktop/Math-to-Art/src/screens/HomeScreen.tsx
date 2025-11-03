import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useStore } from '../state/store';
import { loadAllPuzzles } from '../engine/puzzleLoader';
import { Difficulty } from '../types';
import Badge from '../components/Badge';
import BigButton from '../components/BigButton';

export default function HomeScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const selectedDifficulty = useStore(s => s.selectedDifficulty);
  const setDifficulty = useStore(s => s.setDifficulty);
  const puzzles = useMemo(()=>loadAllPuzzles(selectedDifficulty), [selectedDifficulty]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🎨 Math-to-Art</Text>
        <Text style={styles.sub}>Solve. Connect. Create. ✨</Text>
      </View>

      <View style={styles.segment}>
        {(['EASY','MEDIUM','HARD'] as Difficulty[]).map(d=>(
          <TouchableOpacity key={d} onPress={()=>setDifficulty(d)} style={[styles.segBtn, selectedDifficulty===d ? styles.segActive : null]}>
            <Text style={[styles.segTxt, selectedDifficulty===d ? styles.segTxtActive : null]}>{d}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={puzzles}
        keyExtractor={(it)=>it.id}
        contentContainerStyle={{ paddingHorizontal:20, paddingBottom:20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({item})=>(
          <TouchableOpacity 
            style={styles.card} 
            onPress={()=>nav.navigate('Puzzle',{puzzleId:item.id})}
            activeOpacity={0.8}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <View style={styles.badgeRow}>
                <Badge text={item.theme} />
                <Badge text={item.difficulty} />
              </View>
            </View>
            <View style={[styles.tint,{ backgroundColor: (item.tint || '#eee') as string }]}>
              <View style={[styles.tintInner,{ backgroundColor: (item.tint || '#eee') as string, opacity:0.3 as number }]} />
            </View>
          </TouchableOpacity>
        )}
      />

      <View style={styles.footer}>
        <BigButton label="✨ Open Gallery" onPress={()=>nav.navigate('Gallery')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#F8FAFC' },
  header:{ paddingTop:64, paddingBottom:20, paddingHorizontal:20 },
  title:{ fontSize:42, fontWeight:'900', textAlign:'center', color:'#1E293B', letterSpacing:-1 },
  sub:{ textAlign:'center', color:'#64748B', marginTop:8, fontSize:16, fontWeight:'500' },
  segment:{ flexDirection:'row', alignSelf:'center', backgroundColor:'#E2E8F0', borderRadius:999, padding:6, marginBottom:24, shadowColor:'#000', shadowOffset:{width:0,height:2}, shadowOpacity:0.05, shadowRadius:4, elevation:2 },
  segBtn:{ paddingVertical:10, paddingHorizontal:18, borderRadius:999 },
  segActive:{ backgroundColor:'#fff', shadowColor:'#6366F1', shadowOffset:{width:0,height:2}, shadowOpacity:0.2, shadowRadius:4, elevation:3 },
  segTxt:{ fontSize:15, fontWeight:'700', color:'#64748B' },
  segTxtActive:{ color:'#6366F1' },
  card:{ backgroundColor:'#fff', borderRadius:20, padding:20, marginVertical:6, flexDirection:'row', justifyContent:'space-between', alignItems:'center', shadowColor:'#000', shadowOffset:{width:0,height:4}, shadowOpacity:0.1, shadowRadius:8, elevation:4 },
  cardContent:{ flex:1 },
  cardTitle:{ fontSize:22, fontWeight:'800', color:'#1E293B', marginBottom:10 },
  badgeRow:{ flexDirection:'row', marginTop:4 },
  tint:{ width:70, height:70, borderRadius:16, shadowColor:'#000', shadowOffset:{width:0,height:2}, shadowOpacity:0.15, shadowRadius:4, elevation:3 },
  tintInner:{ width:'100%', height:'100%', borderRadius:16 },
  footer:{ padding:20, paddingBottom:32, backgroundColor:'#F8FAFC' }
});

