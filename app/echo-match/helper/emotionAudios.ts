export type EmotionType = 'Happy' | 'Sad' | 'Love';
export const emotionAudios: Record<EmotionType, string[]> = {
  Happy: [
    '/audio-data/happy1.mp3',
    '/audio-data/happy2.mp3',
    '/audio-data/happy3.mp3'
  ],
  Sad: [
    '/audio-data/sad1.mp3',
    '/audio-data/sad2.mp3'
  ],
  Love: [
    '/audio-data/love1.mp3',
    '/audio-data/love2.mp3'
  ],
};
