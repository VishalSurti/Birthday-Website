import { useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { PageHeader } from '../../components/layout/PageHeader';
import { routes } from '../../app/routes';
import { MediaImage } from '../../components/media/MediaImage';
import { StoryPhotoViewer } from './StoryPhotoViewer';
import { validateStory } from './storyContent';
import './our-story.css';

function readViewer(
  state: unknown,
): { memoryId: string; index: number } | undefined {
  if (!state || typeof state !== 'object' || !('storyViewer' in state)) return;
  const viewer = state.storyViewer;
  if (!viewer || typeof viewer !== 'object') return;
  if (
    'memoryId' in viewer &&
    typeof viewer.memoryId === 'string' &&
    'index' in viewer &&
    typeof viewer.index === 'number' &&
    Number.isInteger(viewer.index)
  )
    return { memoryId: viewer.memoryId, index: viewer.index };
}
export function OurStoryExperience({ content }: { content: unknown }) {
  const story = useMemo(() => validateStory(content), [content]);
  const { state } = useLocation();
  const navigate = useNavigate();
  const viewer = readViewer(state);
  const memory = story.memories.find((item) => item.id === viewer?.memoryId);
  return (
    <>
      <PageHeader title="Our Story" />
      {story.memories.length === 0 ? (
        <section aria-label="Story unavailable">
          <h2>Something isn’t ready here yet.</h2>
          <p>Please try again later.</p>
          <Link className="recovery-link" to={routes.home}>
            Back to Home
          </Link>
        </section>
      ) : (
        <>
          {story.introduction && (
            <p className="story-introduction">{story.introduction}</p>
          )}
          <section className="story-chapters" aria-label="Story memories">
            {story.memories.map((item, chapter) => (
              <article
                key={item.id}
                className={`story-memory${item.images.length === 0 ? ' story-memory--text' : ''}`}
                aria-labelledby={`story-title-${chapter}`}
              >
                <div className="story-metadata">
                  <span className="story-chapter">
                    {String(chapter + 1).padStart(2, '0')}
                  </span>
                  {item.timeLabel && <span>{item.timeLabel}</span>}
                </div>
                <h2 id={`story-title-${chapter}`}>{item.title}</h2>
                {item.images.length > 0 && (
                  <div
                    className={`story-images story-images--${item.images.length}`}
                  >
                    {item.images.map((image, index) => (
                      <button
                        key={`${index}-${image.src}`}
                        type="button"
                        className="story-photo"
                        aria-label={`View photo ${index + 1} from ${item.title}`}
                        onClick={(event) => {
                          event.currentTarget.focus({ preventScroll: true });
                          void navigate(routes.ourStory, {
                            state: {
                              storyViewer: { memoryId: item.id, index },
                            },
                          });
                        }}
                      >
                        <MediaImage
                          key={image.src}
                          image={image}
                          className="story-image-media"
                          loading={chapter === 0 ? 'eager' : 'lazy'}
                        />
                      </button>
                    ))}
                  </div>
                )}
                <div className="story-body">
                  {item.body.split(/\n\s*\n/).map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
                {item.highlightedLine && (
                  <p className="story-highlight">{item.highlightedLine}</p>
                )}
              </article>
            ))}
          </section>
          {story.closing && (
            <section className="story-closing" aria-label="Story continues">
              <p>{story.closing}</p>
            </section>
          )}
        </>
      )}
      {viewer &&
        memory &&
        viewer.index >= 0 &&
        viewer.index < memory.images.length && (
          <StoryPhotoViewer
            key={`${memory.id}-${viewer.index}`}
            memory={memory}
            initialIndex={viewer.index}
            onClose={() => {
              void navigate(-1);
            }}
          />
        )}
    </>
  );
}
