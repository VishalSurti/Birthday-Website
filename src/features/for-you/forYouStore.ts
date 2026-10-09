import sampleMessages from '../../../content/sample/for-you.json';
import { createForYouStore, type ForYouStore } from './forYouStorage';

let store: ForYouStore | undefined;
// Future Home previews can consume this same instance without marking anything seen.
export function getForYouStore() {
  store ??= createForYouStore(sampleMessages);
  return store;
}
