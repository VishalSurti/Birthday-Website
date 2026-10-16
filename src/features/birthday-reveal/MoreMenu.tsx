import { useContext, useRef, useState } from 'react';
import { PaperSheet } from '../../components/layout/PaperSheet';
import { useInstall } from '../install/InstallContext';
import { InstallHelp } from '../install/InstallHelp';
import { useLocation, useNavigate } from 'react-router';
import { ReplayContext } from './replayContext';

export function MoreMenu() {
  const replay = useContext(ReplayContext);
  const [token] = useState(() => crypto.randomUUID());
  const location = useLocation();
  const navigate = useNavigate();
  const button = useRef<HTMLButtonElement>(null);
  const open = !!replay && location.state?.more === token;
  if (!replay) return null;
  return (
    <>
      <button
        ref={button}
        className="more-trigger"
        aria-label="More"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => navigate(location.pathname, { state: { more: token } })}
      >
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          aria-hidden="true"
        >
          <circle cx="5" cy="12" r="1" />
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
        </svg>
      </button>
      {open && (
        <MoreSheet
          onClose={() => navigate(-1)}
          onReplay={replay}
          onRestore={() => button.current?.focus({ preventScroll: true })}
        />
      )}
    </>
  );
}
function MoreSheet({
  onClose,
  onReplay,
  onRestore,
}: {
  onClose: () => void;
  onReplay: () => void;
  onRestore: () => void;
}) {
  const install = useInstall();
  const [help, setHelp] = useState(false);
  const showingHelp = help && install?.available;
  return (
    <PaperSheet
      label={showingHelp ? 'Add to Home Screen' : 'More'}
      onClose={onClose}
      onRestore={onRestore}
    >
      {showingHelp ? (
        <InstallHelp />
      ) : (
        <>
          <button className="more-sheet__row" onClick={onReplay}>
            Replay Birthday Surprise
          </button>
          {install?.available && (
            <button
              className="more-sheet__row"
              onClick={async () => {
                if (await install.request()) setHelp(true);
              }}
            >
              Install / Add to Home Screen
            </button>
          )}
        </>
      )}
    </PaperSheet>
  );
}
