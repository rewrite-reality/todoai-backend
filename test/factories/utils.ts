const alphabet = 'abcdefghijklmnopqrstuvwxyz';

export function randomWord(length = 6): string {
  return Array.from({ length })
    .map(() => alphabet[Math.floor(Math.random() * alphabet.length)])
    .join('');
}

export function randomSentence(words = 4): string {
  return Array.from({ length: words })
    .map(() => randomWord(Math.max(4, Math.floor(Math.random() * 8))))
    .join(' ');
}

export function randomEmoji(): string {
  const emojis = ['📝', '🚀', '✅', '📈', '🧹', '⚡'];
  return emojis[Math.floor(Math.random() * emojis.length)];
}
