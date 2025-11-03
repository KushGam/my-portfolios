import { create } from 'zustand';
import { Puzzle, Difficulty } from '../types';

type State = {
  selectedDifficulty: Difficulty;
  currentPuzzle?: Puzzle;
  unlockedDotIndex: number;
  solvedDotIds: Set<number>;
  gallery: Puzzle[];
};

type Actions = {
  setDifficulty: (d: Difficulty) => void;
  loadPuzzle: (p: Puzzle) => void;
  markDotSolved: (dotId: number) => void;
  resetPuzzle: () => void;
  saveToGallery: () => Promise<void>;
  hydrate: () => Promise<void>;
};

export const useStore = create<State & Actions>((set, get) => ({
  selectedDifficulty: 'EASY',
  unlockedDotIndex: 0,
  solvedDotIds: new Set(),
  gallery: [],
  setDifficulty: (d) => set({ selectedDifficulty: d }),
  loadPuzzle: (p) => set({ currentPuzzle: p, unlockedDotIndex: 0, solvedDotIds: new Set() }),
  markDotSolved: (dotId) => {
    const solved = new Set(get().solvedDotIds);
    solved.add(dotId);
    set({ solvedDotIds: solved, unlockedDotIndex: solved.size });
  },
  resetPuzzle: () => set({ unlockedDotIndex: 0, solvedDotIds: new Set() }),
  saveToGallery: async () => {
    const { currentPuzzle, gallery } = get();
    if (!currentPuzzle) return;
    const updated = [currentPuzzle, ...gallery].slice(0, 200);
    set({ gallery: updated });
    const { saveGallery } = await import('../storage/storage');
    await saveGallery(updated);
  },
  hydrate: async () => {
    const { loadGallery } = await import('../storage/storage');
    const g = await loadGallery();
    set({ gallery: g ?? [] });
  }
}));

