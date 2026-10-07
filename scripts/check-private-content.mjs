import { execFileSync } from 'node:child_process';

// Inspect the index, including newly staged files. Never read private file contents.
try {
  const root = execFileSync('git', ['rev-parse', '--show-toplevel'], {
    encoding: 'utf8',
  }).trim();
  const tracked = execFileSync('git', ['ls-files', '-z', '--cached'], {
    cwd: root,
    encoding: 'utf8',
  })
    .split('\0')
    .filter(Boolean);
  const privateDirectories = [
    'content/private/',
    'public/private-assets/',
    'private-content/',
    'personal-content/',
  ];
  const violations = tracked.filter((file) => {
    const basename = file.split('/').at(-1);
    return (
      privateDirectories.some((directory) => file.startsWith(directory)) ||
      /\.private\.(json|md|txt)$/.test(basename) ||
      (basename !== '.env.example' &&
        (basename === '.env' || basename.startsWith('.env.')))
    );
  });
  if (violations.length) {
    console.error(
      'Privacy check failed: private paths are tracked. Remove them from the Git index before committing.',
    );
    for (const file of violations) console.error(`- ${file}`);
    process.exitCode = 1;
  } else {
    console.log(
      'Privacy check passed: no tracked private-content or environment paths.',
    );
  }
} catch {
  console.error(
    'Privacy check failed: unable to inspect the Git index. Run inside the repository with Git available.',
  );
  process.exitCode = 1;
}
