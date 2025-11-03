import { Puzzle } from '../types';
export function completionPercent(solved:Set<number>, p:Puzzle){ 
  return Math.round((solved.size / Math.max(1,p.dots.length)) * 100); 
}
export function isComplete(solved:Set<number>, p:Puzzle){ 
  return solved.size >= p.dots.length; 
}

