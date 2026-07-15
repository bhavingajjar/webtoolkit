import { applyTransform, countStats } from '../lib/converters/index.js';

self.onmessage = (event) => {
  const { id, mode, text } = event.data ?? {};
  try {
    const result = applyTransform(mode, text);
    const stats = countStats(result);
    self.postMessage({ id, ok: true, result, stats });
  } catch (error) {
    self.postMessage({
      id,
      ok: false,
      error: error instanceof Error ? error.message : 'Transform failed',
    });
  }
};
