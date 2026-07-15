import { chromium } from 'playwright';
import fs from 'node:fs';

const BASE = 'http://localhost:4400';
const pages = [
  '/',
  '/about',
  '/portfolio',
  '/portfolio/masa-artizanului',
  '/products',
  '/products/example-masa-dining-stejar',
  '/products/example-scaun-bucatarie-nuc',
  '/blog',
  '/blog/alegerea-lemnului-potrivit',
  '/contact',
];

const axeSource = fs.readFileSync('/home/seturdei/Documents/InuWood/node_modules/axe-core/axe.min.js', 'utf-8');

const browser = await chromium.launch();
const page = await browser.newPage();

let totalViolations = 0;
const report = [];

for (const p of pages) {
  await page.goto(BASE + p, { waitUntil: 'load', timeout: 15000 });
  await page.waitForTimeout(300);
  // Trigger the scroll-reveal animations across the whole page so the audit
  // reflects the final, fully-revealed visual state rather than the
  // pre-reveal (near-invisible) transitional state.
  await page.evaluate(async () => {
    const height = document.body.scrollHeight;
    const step = 400;
    for (let y = 0; y < height; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 30));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);
  await page.addScriptTag({ content: axeSource });
  const results = await page.evaluate(async () => {
    return await window.axe.run(document, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
      },
    });
  });

  const violations = results.violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    description: v.description,
    help: v.help,
    nodes: v.nodes.map((n) => ({ target: n.target, failureSummary: n.failureSummary, html: n.html })),
  }));

  totalViolations += violations.length;
  report.push({ page: p, violations });
  console.log(`\n=== ${p} ===`);
  if (violations.length === 0) {
    console.log('  No violations found.');
  } else {
    for (const v of violations) {
      console.log(`  [${v.impact}] ${v.id}: ${v.help}`);
      console.log(`    nodes: ${JSON.stringify(v.nodes).slice(0, 300)}`);
    }
  }
}

await browser.close();
fs.writeFileSync('/tmp/a11y-report.json', JSON.stringify(report, null, 2));
console.log(`\nTotal violations across ${pages.length} pages: ${totalViolations}`);
