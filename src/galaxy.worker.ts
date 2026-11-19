/// <reference lib="webworker" />
import { buildClouds, transferables } from './galaxyData';

// Generates the galaxy's star buffers off the main thread and hands them
// back without copying.
self.onmessage = (event: MessageEvent<{ small: boolean }>) => {
  const clouds = buildClouds(event.data.small);
  (self as unknown as DedicatedWorkerGlobalScope).postMessage(clouds, transferables(clouds));
};
