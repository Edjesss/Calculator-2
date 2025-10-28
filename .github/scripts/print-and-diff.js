const { chromium } = require('playwright');
const fs = require('fs');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();

  // Load the single-file app from the repo root
  await p.goto('file://' + process.cwd() + '/index.html');
  await p.waitForTimeout(500); // let render settle

  // Produce PDF and screenshot for inspection
  await p.pdf({
    path: 'out.pdf',
    format: 'A4',
    margin: { top: '12mm', right: '12mm', bottom: '12mm', left: '12mm' }
  });
  await p.screenshot({ path: 'out.png', fullPage: true });
  await b.close();

  // Baseline bootstrap or visual diff
  if (fs.existsSync('tests/golden.png')) {
    const img1 = PNG.sync.read(fs.readFileSync('out.png'));
    const img2 = PNG.sync.read(fs.readFileSync('tests/golden.png'));
    const { width, height } = img1;
    const diff = new PNG({ width, height });
    const mismatches = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });
    if (mismatches > 0) {
      fs.writeFileSync('diff.png', PNG.sync.write(diff));
      console.error('Visual diff detected:', mismatches, 'pixels (see diff.png)');
      process.exit(1);
    }
  } else {
    // First-time bootstrap locally (see step B below)
    fs.mkdirSync('tests', { recursive: true });
    fs.copyFileSync('out.png', 'tests/golden.png');
    console.log('Initialized tests/golden.png as baseline.');
  }
})();
