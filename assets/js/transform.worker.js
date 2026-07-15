import { applyTransform, countStats } from './converters.js';

self.onmessage = (event) => {
  const { id, mode, text } = event.data || {};
  try {
    const result = applyTransform(mode, text);
    self.postMessage({ id, ok: true, result, stats: countStats(result) });
  } catch (error) {
    self.postMessage({
      id,
      ok: false,
      error: error instanceof Error ? error.message : 'Transform failed',
    });
  }
};
