import { useCallback, useEffect, useRef, useState } from 'react';
import { applyTransform, countStats } from '../lib/converters/index.js';

const HEAVY = new Set(['zalgo', 'bold', 'italic', 'wide', 'wingdings', 'morse', 'binary']);
const THRESHOLD = 8000;

let workerInstance = null;
let reqId = 0;

function getWorker() {
  if (typeof Worker === 'undefined') return null;
  if (!workerInstance) {
    workerInstance = new Worker(new URL('../workers/transform.worker.js', import.meta.url), {
      type: 'module',
    });
  }
  return workerInstance;
}

export function useTransform() {
  const [pending, setPending] = useState(false);
  const callbacks = useRef(new Map());

  useEffect(() => {
    const worker = getWorker();
    if (!worker) return undefined;

    const onMessage = (event) => {
      const { id, ok, result, error } = event.data ?? {};
      const cb = callbacks.current.get(id);
      if (!cb) return;
      callbacks.current.delete(id);
      setPending(false);
      if (ok) cb.resolve(result);
      else cb.reject(new Error(error || 'Worker failed'));
    };

    worker.addEventListener('message', onMessage);
    return () => worker.removeEventListener('message', onMessage);
  }, []);

  const transform = useCallback((mode, text) => {
    const useWorker = HEAVY.has(mode) || (text?.length ?? 0) > THRESHOLD;
    const worker = getWorker();

    if (!useWorker || !worker) {
      return Promise.resolve(applyTransform(mode, text));
    }

    setPending(true);
    const id = ++reqId;
    return new Promise((resolve, reject) => {
      callbacks.current.set(id, { resolve, reject });
      worker.postMessage({ id, mode, text });
    });
  }, []);

  return { transform, pending, countStats };
}
