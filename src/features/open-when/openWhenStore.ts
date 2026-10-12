import sampleLetters from '../../../content/sample/open-when.json';
import { createOpenWhenStore, type OpenWhenStore } from './openWhenStorage';

let store: OpenWhenStore | undefined;
export function getOpenWhenStore() {
  store ??= createOpenWhenStore(sampleLetters);
  return store;
}
