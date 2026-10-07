// @vitest-environment node
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

const script = resolve('scripts/check-private-content.mjs');
const temporaryDirectories: string[] = [];

function repository(files: string[]) {
  const cwd = mkdtempSync(join(tmpdir(), 'birthday-privacy-test-'));
  temporaryDirectories.push(cwd);
  execFileSync('git', ['init', '--quiet', cwd]);
  for (const file of files) {
    const target = join(cwd, file);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, '[PLACEHOLDER]\n');
    execFileSync('git', ['add', '--force', '--', file], { cwd });
  }
  return cwd;
}

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0))
    rmSync(directory, { recursive: true, force: true });
});

describe('tracked-path privacy safeguard', () => {
  it('rejects staged private paths and environment patterns at any depth', () => {
    const forbidden = [
      'content/private/message.json',
      'public/private-assets/image.txt',
      'private-content/item.txt',
      'personal-content/item.txt',
      'nested/message.private.json',
      'nested/letter.private.md',
      'note.private.txt',
      '.env',
      '.env.production',
      'nested/.env.local',
    ];
    const result = spawnSync(process.execPath, [script], {
      cwd: repository(forbidden),
      encoding: 'utf8',
    });
    expect(result.status).toBe(1);
    for (const file of forbidden) expect(result.stderr).toContain(file);
  });

  it('allows safe public examples and ignores untracked private files', () => {
    const cwd = repository([
      'content/sample/for-you.json',
      '.env.example',
      'nested/.env.example',
      'public/app-assets/README.md',
    ]);
    mkdirSync(join(cwd, 'content/private'), { recursive: true });
    writeFileSync(join(cwd, 'content/private/untracked.txt'), '[PLACEHOLDER]');
    const result = spawnSync(process.execPath, [script], {
      cwd,
      encoding: 'utf8',
    });
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('Privacy check passed');
  });
});
