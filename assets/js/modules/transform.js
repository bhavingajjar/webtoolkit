import { applyTransform } from './converters.js';

const HEAVY = new Set(['zalgo', 'bold', 'italic', 'wide', 'wingdings', 'morse', 'binary']);
const THRESHOLD = 8000;

let worker;
let reqId = 0;
const pending = new Map();

function getWorker() {
  if (typeof Worker === 'undefined') return null;
  if (!worker) {
    worker = new Worker(new URL('../transform.worker.js', import.meta.url), { type: 'module' });
    worker.addEventListener('message', (event) => {
      const { id, ok, result, error } = event.data || {};
      const entry = pending.get(id);
      if (!entry) return;
      pending.delete(id);
      if (ok) entry.resolve(result);
      else entry.reject(new Error(error || 'Worker failed'));
    });
  }
  return worker;
}

/** Run a convert mode on the main thread or in a worker for heavy/large jobs. */
export async function transform(mode, text) {
  const useWorker = HEAVY.has(mode) || (text?.length || 0) > THRESHOLD;
  const w = getWorker();
  if (!useWorker || !w) return applyTransform(mode, text);
  const id = ++reqId;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    w.postMessage({ id, mode, text });
  });
}
