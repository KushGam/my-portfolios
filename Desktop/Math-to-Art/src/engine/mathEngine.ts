import { Difficulty, MathQuestion } from '../types';

function ri(a:number,b:number){ return Math.floor(Math.random()*(b-a+1))+a; }

export function genQuestion(diff: Difficulty): MathQuestion {
  // EASY: Add and Subtract only
  if (diff === 'EASY') {
    const a = ri(1, 20), b = ri(1, 20);
    if (Math.random() < 0.5) {
      // Addition
      return { kind:'ADD', prompt:`${a} + ${b} = ?`, answer: String(a+b) };
    } else {
      // Subtraction (ensure positive result)
      const max = Math.max(a, b);
      const min = Math.min(a, b);
      return { kind:'SUB', prompt:`${max} - ${min} = ?`, answer: String(max-min) };
    }
  }
  
  // MEDIUM: Mix simple (Add, Subtract, Multiply, Divide)
  if (diff === 'MEDIUM') {
    const rand = Math.random();
    if (rand < 0.3) {
      // Addition
      const a = ri(10, 50), b = ri(10, 50);
      return { kind:'ADD', prompt:`${a} + ${b} = ?`, answer: String(a+b) };
    } else if (rand < 0.6) {
      // Subtraction
      const a = ri(20, 60), b = ri(5, a);
      return { kind:'SUB', prompt:`${a} - ${b} = ?`, answer: String(a-b) };
    } else if (rand < 0.8) {
      // Multiplication
      const a = ri(2, 9), b = ri(2, 9);
      return { kind:'MUL', prompt:`${a} × ${b} = ?`, answer:String(a*b) };
    } else {
      // Division
      const b = ri(2, 9), ans = ri(2, 9);
      const a = b * ans;
      return { kind:'DIV', prompt:`${a} ÷ ${b} = ?`, answer:String(ans) };
    }
  }
  
  // HARD: Multiply, Add, Divide
  if (diff === 'HARD') {
    const rand = Math.random();
    if (rand < 0.4) {
      // Multiplication (larger numbers)
      const a = ri(5, 15), b = ri(5, 15);
      return { kind:'MUL', prompt:`${a} × ${b} = ?`, answer:String(a*b) };
    } else if (rand < 0.7) {
      // Addition (larger numbers)
      const a = ri(50, 200), b = ri(50, 200);
      return { kind:'ADD', prompt:`${a} + ${b} = ?`, answer: String(a+b) };
    } else {
      // Division (larger numbers)
      const b = ri(3, 12), ans = ri(5, 15);
      const a = b * ans;
      return { kind:'DIV', prompt:`${a} ÷ ${b} = ?`, answer:String(ans) };
    }
  }
  
  // Fallback (shouldn't happen)
  const a = ri(1, 9), b = ri(1, 9);
  return { kind:'ADD', prompt:`${a} + ${b} = ?`, answer: String(a+b) };
}

