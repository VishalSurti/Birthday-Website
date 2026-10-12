import sampleStory from '../../content/sample/our-story.json';
import { OurStoryExperience } from '../features/our-story/OurStoryExperience';

export function OurStoryPage() {
  return <OurStoryExperience content={sampleStory} />;
}
