import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import { useStore } from '../state/store';
import { getPuzzleById } from '../engine/puzzleLoader';
import DotCanvas from '../components/DotCanvas';
import MathModal from '../components/MathModal';
import { isComplete, completionPercent } from '../engine/scoring';

export default function PuzzleScreen() {
  const route = useRoute<RouteProp<RootStackParamList,'Puzzle'>>();
  const nav = useNavigation();
  const loadPuzzle = useStore(s=>s.loadPuzzle);
  const puzzle = useStore(s=>s.currentPuzzle);
  const solved = useStore(s=>s.solvedDotIds);
  const unlockedIdx = useStore(s=>s.unlockedDotIndex);
  const markDotSolved = useStore(s=>s.markDotSolved);
  const saveToGallery = useStore(s=>s.saveToGallery);

  // ALL HOOKS MUST BE CALLED FIRST - UNCONDITIONALLY
  const [showQ, setShowQ] = useState(false);

  const localPuzzle = useMemo(()=>getPuzzleById(route.params.puzzleId), [route.params.puzzleId]);

  useEffect(()=>{ loadPuzzle(localPuzzle); },[loadPuzzle, localPuzzle]);

  // Calculate derived values AFTER all hooks
  const completed = puzzle ? isComplete(solved, puzzle) : false;
  const percent = puzzle ? completionPercent(solved, puzzle) : 0;
  const nextDot = puzzle && !completed && unlockedIdx < puzzle.dots.length ? puzzle.dots[unlockedIdx] : undefined;
  
  // Callback hooks MUST be defined before any early returns
  const handlePressNextDot = useCallback(() => {
    if (puzzle && !completed) setShowQ(true);
  }, [puzzle, completed]);

  // Early return AFTER all hooks
  if (!puzzle) return null;

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: (puzzle.tint || '#F3F4F6') as string }]}>
        <TouchableOpacity onPress={()=>nav.goBack()} style={styles.backBtn}>
          <Text style={styles.backBtnTxt}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{puzzle.title}</Text>
        <View style={styles.percentContainer}>
          <Text style={styles.percent}>{percent}%</Text>
        </View>
      </View>

      <View style={styles.canvasContainer}>
            <DotCanvas
              puzzle={puzzle}
              solvedDotIds={solved}
              unlockedDotIndex={unlockedIdx}
              onPressNextDot={handlePressNextDot}
            />
      </View>

      {completed && (
        <View style={styles.completionBanner}>
          <Text style={styles.completionEmoji}>🎉✨🎊</Text>
          <Text style={styles.completionText}>You Did It! 🎨</Text>
          <Text style={styles.completionSubtext}>Amazing work! Look at your beautiful art! 🏆</Text>
        </View>
      )}

      <View style={styles.footer}>
        {completed ? (
          <TouchableOpacity 
            onPress={async()=>{ await saveToGallery(); nav.navigate('Gallery' as never); }} 
            style={styles.saveBtn}
            activeOpacity={0.8}
          >
            <Text style={styles.saveBtnTxt}>💾 Save to Gallery</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            onPress={()=>setShowQ(true)} 
            style={styles.solveBtn}
            activeOpacity={0.8}
          >
            <Text style={styles.solveBtnTxt}>✨ Solve Next Dot</Text>
          </TouchableOpacity>
        )}
      </View>

      {nextDot && (
        <MathModal
          visible={showQ}
          question={nextDot.q}
          onClose={()=>setShowQ(false)}
          onCorrect={()=>{ setShowQ(false); markDotSolved(nextDot.id); }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#F8FAFC' },
  header:{ paddingHorizontal:20, paddingTop:50, paddingBottom:16, alignItems:'center', justifyContent:'space-between', flexDirection:'row', borderBottomLeftRadius:24, borderBottomRightRadius:24, shadowColor:'#000', shadowOffset:{width:0,height:2}, shadowOpacity:0.1, shadowRadius:8, elevation:4 },
  backBtn:{ width:40, height:40, borderRadius:20, backgroundColor:'rgba(255,255,255,0.3)', alignItems:'center', justifyContent:'center' },
  backBtnTxt:{ fontSize:24, fontWeight:'700', color:'#fff' },
  title:{ fontSize:24, fontWeight:'900', color:'#fff', flex:1, textAlign:'center', textShadowColor:'rgba(0,0,0,0.2)', textShadowOffset:{width:0,height:1}, textShadowRadius:3 },
  percentContainer:{ backgroundColor:'rgba(255,255,255,0.3)', paddingHorizontal:14, paddingVertical:6, borderRadius:20 },
  percent:{ fontSize:18, fontWeight:'800', color:'#fff' },
  canvasContainer:{ flex:1, alignItems:'center', justifyContent:'center', padding:20 },
  completionBanner:{ backgroundColor:'#10B981', marginHorizontal:20, marginBottom:16, padding:20, borderRadius:20, alignItems:'center', shadowColor:'#10B981', shadowOffset:{width:0,height:6}, shadowOpacity:0.4, shadowRadius:12, elevation:8 },
  completionEmoji:{ fontSize:32, marginBottom:8 },
  completionText:{ fontSize:20, fontWeight:'800', color:'#fff', marginBottom:4 },
  completionSubtext:{ fontSize:16, fontWeight:'600', color:'rgba(255,255,255,0.9)' },
  footer:{ padding:20, paddingBottom:32 },
  solveBtn:{ backgroundColor:'#6366F1', paddingVertical:18, paddingHorizontal:24, borderRadius:16, alignItems:'center', shadowColor:'#6366F1', shadowOffset:{width:0,height:6}, shadowOpacity:0.3, shadowRadius:10, elevation:6 },
  solveBtnTxt:{ fontSize:20, fontWeight:'800', color:'#fff' },
  saveBtn:{ backgroundColor:'#10B981', paddingVertical:18, paddingHorizontal:24, borderRadius:16, alignItems:'center', shadowColor:'#10B981', shadowOffset:{width:0,height:6}, shadowOpacity:0.3, shadowRadius:10, elevation:6 },
  saveBtnTxt:{ fontSize:20, fontWeight:'800', color:'#fff' }
});

