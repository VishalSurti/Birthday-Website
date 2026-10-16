import { useRef, useState } from 'react';
import { PaperSheet } from '../../components/layout/PaperSheet';
import { useInstall } from './InstallContext';
import { InstallHelp } from './InstallHelp';
import './install.css';

export function InstallSuggestion() {
  const install = useInstall();
  const [help, setHelp] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  if (!install?.visible) return null;
  return (
    <>
      <section className="install-suggestion" aria-labelledby="install-title">
        <h2 className="install-title" id="install-title">
          Keep this close
        </h2>
        <p className="install-copy">
          Add this to your home screen for easier access.
        </p>
        <div className="install-actions">
          <button
            ref={button}
            className="install-primary"
            onClick={async () => {
              if (await install.request()) setHelp(true);
            }}
          >
            Install
          </button>
          <button className="install-secondary" onClick={install.dismiss}>
            Not now
          </button>
        </div>
      </section>
      {help && (
        <PaperSheet
          label="Add to Home Screen"
          onClose={() => setHelp(false)}
          onRestore={() => button.current?.focus({ preventScroll: true })}
        >
          <InstallHelp />
        </PaperSheet>
      )}
    </>
  );
}
