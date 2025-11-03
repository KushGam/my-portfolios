import AsyncStorage from '@react-native-async-storage/async-storage';
import { Puzzle } from '../types';

const GALLERY_KEY = 'mta_gallery_v1';

export async function saveGallery(gallery: Puzzle[]) {
  await AsyncStorage.setItem(GALLERY_KEY, JSON.stringify(gallery));
}

export async function loadGallery(): Promise<Puzzle[] | null> {
  const s = await AsyncStorage.getItem(GALLERY_KEY);
  return s ? JSON.parse(s) : null;
}

