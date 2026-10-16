export function InstallHelp() {
  const ios =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  return (
    <>
      <h2 className="install-title">Add to Home Screen</h2>
      <p className="install-copy">
        {ios
          ? 'Open the browser Share menu, then choose Add to Home Screen.'
          : 'Open your browser menu and choose Install app or Add to Home Screen, if available.'}
      </p>
    </>
  );
}
