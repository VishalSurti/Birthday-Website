import { OpenWhenCollection } from '../features/open-when/OpenWhenCollection';
import { getOpenWhenStore } from '../features/open-when/openWhenStore';

export function OpenWhenPage() {
  return <OpenWhenCollection store={getOpenWhenStore()} />;
}
