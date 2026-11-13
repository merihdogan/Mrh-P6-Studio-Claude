'use strict';
// Claude Desktop uzantisi (.mcpb) uretir: paket/mrh-p6-<surum>.mcpb
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const KOK = path.join(__dirname, '..');
const surum = require('../package.json').version;
const gecici = path.join(KOK, 'paket', 'mcpb');
const cikti = path.join(KOK, 'paket', `mrh-p6-${surum}.mcpb`);
fs.rmSync(gecici, { recursive: true, force: true }); fs.rmSync(cikti, { force: true });
fs.mkdirSync(gecici, { recursive: true });
const icerik = ['manifest.json', 'package.json', 'LICENSE', 'README.md', 'mrh'];
for (const f of icerik) fs.cpSync(path.join(KOK, f), path.join(gecici, f), { recursive: true });
if (process.platform === 'win32') execFileSync(path.join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'tar.exe'), ['-a', '-c', '-f', cikti, ...icerik], { cwd: gecici, stdio: 'inherit' });
else execFileSync('zip', ['-r', '-q', cikti, ...icerik], { cwd: gecici, stdio: 'inherit' });
fs.rmSync(gecici, { recursive: true, force: true });
console.log('Hazir:', cikti, (fs.statSync(cikti).size / 1024).toFixed(0) + ' KB');
