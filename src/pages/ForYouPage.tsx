import { ForYouExperience } from '../features/for-you/ForYouExperience';
import { getForYouStore } from '../features/for-you/forYouStore';

export function ForYouPage() {
  return <ForYouExperience store={getForYouStore()} />;
}
