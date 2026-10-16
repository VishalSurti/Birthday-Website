import { MediaImage } from '../components/media/MediaImage';
import './HomePage.css';
import { PageHeader } from '../components/layout/PageHeader';

export function HomePage() {
  return (
    <>
      <PageHeader title="Home" />
      <p>[FEATURE PLACEHOLDER — HOME]</p>
      <MediaImage
        className="home-hero"
        image={{
          src: '/app-assets/media-placeholder.svg',
          alt: 'Development placeholder image for layout testing.',
          width: 800,
          height: 600,
        }}
        loading="eager"
        fetchPriority="high"
      />
    </>
  );
}
