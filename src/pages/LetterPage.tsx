import { LetterReader } from '../features/open-when/LetterReader';
import { getOpenWhenStore } from '../features/open-when/openWhenStore';

export function LetterPage() {
  return <LetterReader store={getOpenWhenStore()} />;
}
