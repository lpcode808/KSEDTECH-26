#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const html = readFileSync(resolve(root, "index.html"), "utf8");
const css = readFileSync(resolve(root, "styles.css"), "utf8");
const js = readFileSync(resolve(root, "script.js"), "utf8");

const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function count(pattern, source = html) {
  return [...source.matchAll(pattern)].length;
}

assert(html.includes('<main id="main">'), "Main landmark with skip target is missing.");
assert(html.includes('class="skip-link" href="#main"'), "Skip link is missing or no longer targets main.");
assert(html.includes('aria-label="Primary navigation"'), "Primary navigation label is missing.");
assert(html.includes('aria-label="Open navigation menu"'), "Menu button needs an accessible default name.");
assert(count(/role="tab"/g) === 3, "Schedule should expose exactly three tabs.");
assert(count(/role="tabpanel"/g) === 3, "Schedule should expose exactly three tab panels.");
assert(count(/aria-selected="true"/g) === 1, "Exactly one schedule tab should start selected.");
assert(html.includes('id="tab-precon" tabindex="0"'), "Active schedule tab should start in the tab order.");
assert(html.includes('id="tab-day1" tabindex="-1"'), "Inactive Day 1 tab should use roving tabindex.");
assert(html.includes('id="tab-day2" tabindex="-1"'), "Inactive Day 2 tab should use roving tabindex.");
assert(html.includes('class="sticky-cta" href="#registration" aria-hidden="true" tabindex="-1"'), "Hidden sticky CTA should not be keyboard reachable.");
assert(count(/target="_blank" rel="noreferrer"/g) === 5, "Outbound links should remain privacy-preserving.");
assert(count(/opens registration in a new tab/g) === 4, "Outbound registration links should announce that they open a new tab.");
assert(html.includes("Browse Official Session List"), "Session catalog link is missing.");
assert(count(/<h1>/g) === 1, "Page should have exactly one h1.");
assert(count(/<section/g) >= 8, "Expected the main content sections to remain present.");
assert(html.includes("June 2-3, 2026"), "Conference date copy is missing.");
assert(html.includes("Neal S. Blaisdell Center"), "Venue copy is missing.");
assert(html.includes("$175"), "Registration price copy is missing.");
assert(html.includes("assets/img/highlight-1.jpg"), "Highlight images should remain local assets.");
assert(html.includes("assets/img/connect26-logo.png"), "CONNECT26 logo asset is missing.");

assert(css.includes(":focus-visible"), "Visible focus styles are missing.");
assert(css.includes("@media (prefers-reduced-motion: reduce)"), "Reduced-motion media query is missing.");
assert(css.includes("@media (max-width: 359px)"), "Narrow mobile breakpoint is missing.");
assert(css.includes("@media (min-width: 880px)"), "Desktop breakpoint is missing.");
assert(css.includes("overflow-x: auto"), "Horizontal reels should retain controlled overflow.");

assert(js.includes("aria-label"), "Menu script should update the accessible menu name.");
assert(js.includes("candidate.tabIndex = isActive ? 0 : -1"), "Schedule tabs should keep roving tabindex in sync.");
assert(js.includes("stickyCta.setAttribute(\"aria-hidden\""), "Sticky CTA visibility should be exposed to assistive tech.");
assert(js.includes("stickyCta.tabIndex = isVisible ? 0 : -1"), "Sticky CTA keyboard reachability should follow visibility.");
assert(js.includes("ArrowLeft") && js.includes("ArrowRight") && js.includes("Home") && js.includes("End"), "Schedule tab keyboard shortcuts are missing.");
assert(js.includes("Escape"), "Mobile menu should close with Escape.");

if (failures.length > 0) {
  console.error("Static smoke test failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Static smoke test passed.");
