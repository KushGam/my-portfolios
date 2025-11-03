import React, { useMemo, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, TouchableWithoutFeedback, Animated } from 'react-native';
import Svg, { Circle, Line, Path, G } from 'react-native-svg';
import { Puzzle } from '../types';
import { getLocalAssets } from '../packs/assetMap';
import { getAssetIdFromPuzzleId, getAssetIdFromTitle } from '../engine/puzzleToAssetMap';

const { width } = Dimensions.get('window');
const SIZE = Math.min(width - 24, 420);

export default function DotCanvas({
  puzzle, solvedDotIds, unlockedDotIndex, onPressNextDot
}:{ puzzle: Puzzle; solvedDotIds: Set<number>; unlockedDotIndex: number; onPressNextDot: () => void }) {
  const dots = puzzle.dots;
  const lineColor = puzzle.tint || '#6366F1';
  const isComplete = unlockedDotIndex >= dots.length;
  
  // Get asset ID for this puzzle and load SVG component
  const assetId = useMemo(() => {
    return getAssetIdFromPuzzleId(puzzle.id) || getAssetIdFromTitle(puzzle.title) || null;
  }, [puzzle.id, puzzle.title]);

  // Load SVG component if asset exists (lazy to prevent hanging)
  const SvgAsset = useMemo(() => {
    if (!assetId) return null;
    try {
      // Wrap in try-catch and check if function exists before calling
      const assets = getLocalAssets(assetId);
      if (!assets || !assets.outline) {
        return null;
      }
      const SvgComponent = assets.outline;
      // react-native-svg-transformer returns a component, not an element
      // Check if it's a valid component (function or element)
      if (typeof SvgComponent === 'function' || (SvgComponent && typeof SvgComponent === 'object')) {
        return SvgComponent;
      }
      return null;
    } catch (error) {
      console.warn('Failed to load SVG for', assetId, error);
      return null;
    }
  }, [assetId]);
  
  // Animation for completed image reveal
  const completedAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotationAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    if (isComplete) {
      // Celebration animation sequence: scale up, bounce, rotate slightly
      Animated.sequence([
        Animated.parallel([
          Animated.timing(completedAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: false,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1.15,
            tension: 50,
            friction: 6,
            useNativeDriver: false,
          }),
        ]),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: false,
        }),
        Animated.timing(rotationAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      completedAnim.setValue(0);
      scaleAnim.setValue(0);
      rotationAnim.setValue(0);
    }
  }, [isComplete, completedAnim, scaleAnim, rotationAnim]);
  
  // Create smooth filled path from dots for completed view
  const completedPath = useMemo(() => {
    if (!isComplete || dots.length === 0) return null;
    const sortedDots = [...dots].sort((a, b) => a.id - b.id);
    
    if (sortedDots.length < 3) return null;
    
    // Create smooth curve using cubic bezier for better shapes
    let path = `M ${sortedDots[0].x * SIZE} ${sortedDots[0].y * SIZE}`;
    
    for (let i = 1; i < sortedDots.length; i++) {
      const curr = sortedDots[i];
      const prev = sortedDots[i - 1];
      const next = sortedDots[i + 1];
      
      if (next) {
        // Smooth curve: control point is between prev and curr
        const cp1X = prev.x * SIZE + (curr.x - prev.x) * 0.5 * SIZE;
        const cp1Y = prev.y * SIZE + (curr.y - prev.y) * 0.5 * SIZE;
        const cp2X = curr.x * SIZE - (next.x - curr.x) * 0.3 * SIZE;
        const cp2Y = curr.y * SIZE - (next.y - curr.y) * 0.3 * SIZE;
        const endX = (curr.x + next.x) / 2 * SIZE;
        const endY = (curr.y + next.y) / 2 * SIZE;
        path += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;
      } else {
        // Last point
        const lastPrev = sortedDots[i - 1];
        const cpX = lastPrev.x * SIZE + (curr.x - lastPrev.x) * 0.5 * SIZE;
        const cpY = lastPrev.y * SIZE + (curr.y - lastPrev.y) * 0.5 * SIZE;
        path += ` Q ${cpX} ${cpY} ${curr.x * SIZE} ${curr.y * SIZE}`;
      }
    }
    
    // Close the path to form a filled shape
    path += ` Z`;
    
    return path;
  }, [isComplete, dots, SIZE]);
  
  // Memoize lines to avoid recalculating on every render
  const lines = useMemo(() => {
    const lineElements = [];
    const sortedDots = [...dots].sort((a, b) => a.id - b.id);
    
    for (let i = 1; i < sortedDots.length; i++) {
      const prevDot = sortedDots[i - 1];
      const currentDot = sortedDots[i];
      
      if (solvedDotIds.has(prevDot.id) && solvedDotIds.has(currentDot.id)) {
        lineElements.push(
          <Line 
            key={`l${prevDot.id}-${currentDot.id}`} 
            x1={prevDot.x * SIZE} 
            y1={prevDot.y * SIZE} 
            x2={currentDot.x * SIZE} 
            y2={currentDot.y * SIZE} 
            stroke={lineColor} 
            strokeWidth={6} 
            strokeLinecap="round" 
            strokeOpacity={0.9}
          />
        );
      }
    }
    return lineElements;
  }, [dots, solvedDotIds, lineColor, SIZE]);

  const nextDot = unlockedDotIndex < dots.length ? dots[unlockedDotIndex] : null;

  if (!dots || dots.length === 0) {
    return <View style={styles.wrap} />;
  }

  const completedOpacity = (completedAnim as any)._value ?? 0;
  const completedScale = (scaleAnim as any)._value ?? (isComplete ? 1 : 0);
  const rotation = (rotationAnim as any)._value ?? 0;
  const rotationDeg = rotation * 5; // Slight rotation (5 degrees max)

  return (
    <View style={styles.wrap}>
      <TouchableWithoutFeedback onPress={onPressNextDot}>
        <View style={styles.canvasWrapper}>
          {/* Main SVG canvas for dots and lines */}
          <Svg width={SIZE} height={SIZE} style={styles.svg}>
            {/* Completed image overlay - show real SVG if available, otherwise filled path from dots */}
            {isComplete && (
              <G
                opacity={completedOpacity}
                transform={`translate(${SIZE/2} ${SIZE/2}) scale(${completedScale}) rotate(${rotationDeg}) translate(${-SIZE/2} ${-SIZE/2})`}
              >
                {/* Fallback: Filled shape from dots (when no SVG available) */}
                {!SvgAsset && completedPath && (
                  <>
                    <Path
                      d={completedPath}
                      fill={lineColor}
                      fillOpacity={0.4}
                      stroke={lineColor}
                      strokeWidth={10}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <Path
                      d={completedPath}
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth={4}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity={0.6}
                    />
                  </>
                )}
                
                {/* Sparkle stars around completed shape */}
                {dots.map((d, i) => {
                  if (i % 4 === 0) {
                    const sparkleRot = (rotation + i * 0.1) * 360;
                    return (
                      <G key={`sparkle${d.id}`} transform={`translate(${d.x * SIZE} ${d.y * SIZE}) rotate(${sparkleRot})`}>
                        {/* 4-pointed star */}
                        <Path
                          d="M0,-8 L2,-2 L8,-2 L3,1 L5,7 L0,4 L-5,7 L-3,1 L-8,-2 L-2,-2 Z"
                          fill="#FFD700"
                          opacity={0.9 * completedOpacity}
                        />
                      </G>
                    );
                  }
                  return null;
                })}
                {/* Particle burst effect */}
                {Array.from({length: 12}).map((_, i) => {
                  const angle = (i / 12) * Math.PI * 2;
                  const distance = 30 + (completedOpacity * 20);
                  const x = SIZE/2 + Math.cos(angle) * distance;
                  const y = SIZE/2 + Math.sin(angle) * distance;
                  return (
                    <Circle
                      key={`particle${i}`}
                      cx={x}
                      cy={y}
                      r={3}
                      fill="#FFD700"
                      opacity={completedOpacity * 0.7}
                    />
                  );
                })}
              </G>
            )}
            
            {/* Draw lines connecting dots (during gameplay) */}
            {!isComplete && lines}
            
            {/* Draw dots (fade out when completed) */}
            {dots.map((d,i)=>{
              const isUnlocked = i <= unlockedDotIndex;
              const isSolved = i < unlockedDotIndex;
              const isCurrent = i === unlockedDotIndex;
              
              // Fade out dots when completed
              const dotOpacity = isComplete ? Math.max(0, 1 - completedOpacity) : (isUnlocked ? 1 : 0.5);
              const radius = isSolved ? 12 : (isCurrent ? 14 : (isUnlocked ? 10 : 7));
              
              return (
                <Circle
                  key={d.id}
                  cx={d.x*SIZE}
                  cy={d.y*SIZE}
                  r={radius}
                  fill={isSolved ? '#10B981' : (isCurrent ? '#F59E0B' : '#CBD5E1')}
                  stroke={isUnlocked ? '#fff' : '#CBD5E1'}
                  strokeWidth={isUnlocked ? 3 : 0}
                  opacity={dotOpacity}
                />
              );
            })}
            
            {/* Pulse rings for next dot */}
            {nextDot && !isComplete && (
              <>
                <Circle cx={nextDot.x*SIZE} cy={nextDot.y*SIZE} r={24} stroke="#F59E0B" strokeWidth={3} fill="none" opacity={0.4} />
                <Circle cx={nextDot.x*SIZE} cy={nextDot.y*SIZE} r={32} stroke="#F59E0B" strokeWidth={2} fill="none" opacity={0.25} />
                <Circle cx={nextDot.x*SIZE} cy={nextDot.y*SIZE} r={40} stroke="#F59E0B" strokeWidth={2} fill="none" opacity={0.15} />
                {/* Sparkle effect */}
                <Circle cx={nextDot.x*SIZE - 8} cy={nextDot.y*SIZE - 8} r={3} fill="#FFD700" opacity={0.8} />
                <Circle cx={nextDot.x*SIZE + 8} cy={nextDot.y*SIZE + 8} r={3} fill="#FFD700" opacity={0.8} />
                <Circle cx={nextDot.x*SIZE + 8} cy={nextDot.y*SIZE - 8} r={2} fill="#FFD700" opacity={0.8} />
                <Circle cx={nextDot.x*SIZE - 8} cy={nextDot.y*SIZE + 8} r={2} fill="#FFD700" opacity={0.8} />
              </>
            )}
          </Svg>
          
          {/* Real SVG artwork overlay (rendered separately to avoid nesting) */}
          {isComplete && SvgAsset && (
            <Animated.View 
              style={[
                StyleSheet.absoluteFill,
                {
                  opacity: completedAnim,
                  transform: [
                    { scale: scaleAnim },
                    { 
                      rotate: rotationAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '5deg']
                      })
                    }
                  ]
                }
              ]}
              pointerEvents="none"
            >
              <View style={{
                position: 'absolute',
                left: SIZE * 0.1,
                top: SIZE * 0.1,
                width: SIZE * 0.8,
                height: SIZE * 0.8,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {typeof SvgAsset === 'function' ? (
                  <SvgAsset 
                    width={SIZE * 0.8} 
                    height={SIZE * 0.8}
                  />
                ) : null}
              </View>
            </Animated.View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap:{ alignItems:'center', justifyContent:'center', padding:10 },
  canvasWrapper:{ shadowColor:'#000', shadowOffset:{width:0,height:8}, shadowOpacity:0.15, shadowRadius:16, elevation:8, borderRadius:24 },
  svg:{ backgroundColor:'#FFFFFF', borderRadius:24 }
});
