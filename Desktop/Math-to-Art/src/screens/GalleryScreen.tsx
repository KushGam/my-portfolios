import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../state/store';

export default function GalleryScreen() {
  const nav = useNavigation();
  const gallery = useStore(s=>s.gallery);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>nav.goBack()} style={styles.backBtn}>
          <Text style={styles.backBtnTxt}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>🎨 My Gallery</Text>
        <View style={{ width:40 }} />
      </View>
      <FlatList
        data={gallery}
        keyExtractor={(it, index)=>`${it.id}-${index}`}
        contentContainerStyle={{ padding:20, paddingTop:10 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🖼️</Text>
            <Text style={styles.emptyText}>No saved art yet.</Text>
            <Text style={styles.emptySubtext}>Complete puzzles to add them here!</Text>
          </View>
        }
        renderItem={({item})=>(
          <View style={styles.card}>
            <View style={[styles.swatch, { backgroundColor: (item.tint || '#ddd') as string }]}>
              <View style={[styles.swatchInner, { backgroundColor: (item.tint || '#ddd') as string, opacity:0.2 as number }]} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardMeta}>{item.theme} • {item.difficulty}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#F8FAFC' },
  header:{ flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingTop:50, paddingBottom:20, paddingHorizontal:20 },
  backBtn:{ width:40, height:40, borderRadius:20, backgroundColor:'#E2E8F0', alignItems:'center', justifyContent:'center' },
  backBtnTxt:{ fontSize:24, fontWeight:'700', color:'#1E293B' },
  title:{ fontSize:32, fontWeight:'900', textAlign:'center', color:'#1E293B', flex:1 },
  emptyState:{ alignItems:'center', justifyContent:'center', paddingVertical:80 },
  emptyEmoji:{ fontSize:64, marginBottom:16 },
  emptyText:{ fontSize:20, fontWeight:'700', color:'#64748B', marginBottom:8 },
  emptySubtext:{ fontSize:16, color:'#94A3B8' },
  card:{ backgroundColor:'#fff', padding:16, borderRadius:20, flexDirection:'row', alignItems:'center', marginBottom:12, shadowColor:'#000', shadowOffset:{width:0,height:4}, shadowOpacity:0.1, shadowRadius:8, elevation:4 },
  swatch:{ width:70, height:70, borderRadius:16, shadowColor:'#000', shadowOffset:{width:0,height:2}, shadowOpacity:0.15, shadowRadius:4, elevation:3 },
  swatchInner:{ width:'100%', height:'100%', borderRadius:16 },
  cardContent:{ marginLeft:16, flex:1 },
  cardTitle:{ fontSize:20, fontWeight:'800', color:'#1E293B', marginBottom:6 },
  cardMeta:{ color:'#64748B', fontSize:14, fontWeight:'500' }
});

