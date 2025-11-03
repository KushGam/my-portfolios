import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const getBadgeStyle = (text: string) => {
  const upper = text.toUpperCase();
  if (upper === 'ANIMALS') return { bg: '#FEF3C7', text: '#92400E' };
  if (upper === 'VEHICLES') return { bg: '#DBEAFE', text: '#1E40AF' };
  if (upper === 'SPACE') return { bg: '#E9D5FF', text: '#6B21A8' };
  if (upper === 'EASY') return { bg: '#D1FAE5', text: '#065F46' };
  if (upper === 'MEDIUM') return { bg: '#FDE68A', text: '#92400E' };
  if (upper === 'HARD') return { bg: '#FECACA', text: '#991B1B' };
  return { bg: '#F3F4F6', text: '#374151' };
};

export default function Badge({ text }:{text:string}) {
  const style = getBadgeStyle(text);
  return (
    <View style={[styles.badge, { backgroundColor: style.bg }]}>
      <Text style={[styles.txt, { color: style.text }]}>{text}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  badge:{ paddingHorizontal:12, paddingVertical:6, borderRadius:999, marginRight:8 },
  txt:{ fontSize:12, fontWeight:'700', letterSpacing:0.3 }
});

