#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const BASE = __dirname;
const SKIP = new Set([
  'app', 'assets', 'blog', 'build', 'claim', 'client-sites', 'dashboard',
  'dashboard-test', 'for-tattoo-artists', 'getminted-assets', 'icons',
  'mint', 'mint-preview', 'mission-control', 'plans', 'postcard-pdf',
  'pricing', 'tabs', 'test', 'test-discord-v2', 'wix', 'booksybiz',
  '.git', 'node_modules'
]);

function extractInfo(html) {
  // Business name from <title>
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  let name = 'Business';
  if (titleMatch) {
    // Title is usually "Name | Industry" or "Privacy Policy — Name"
    name = titleMatch[1].split('|')[0].trim();
  }
  
  // Email from mailto:
  const emailMatch = html.match(/mailto:([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/i);
  const email = emailMatch ? emailMatch[1] : 'support@getminted.ai';
  
  // Accent color from --accent CSS var
  const accentMatch = html.match(/--accent:\s*(#[0-9a-fA-F]{3,8})/);
  const accent = accentMatch ? accentMatch[1] : '#00C882';
  
  // Background color from --black CSS var
  const bgMatch = html.match(/--black:\s*(#[0-9a-fA-F]{3,8})/);
  const bg = bgMatch ? bgMatch[1] : '#0a0a0a';
  
  return { name, email, accent, bg };
}

function generatePrivacyHtml(name, bg, accent, email) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Privacy Policy — ${name}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:${bg};color:rgba(255,255,255,0.85);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:1.7;padding:40px 24px}
  .wrap{max-width:720px;margin:0 auto}
  h1{font-size:28px;font-weight:800;color:#fff;margin-bottom:8px}
  h2{font-size:17px;font-weight:700;color:#fff;margin:32px 0 10px}
  p{color:rgba(255,255,255,0.7);margin-bottom:14px;font-size:15px}
  a{color:${accent};text-decoration:none}
  .updated{font-size:13px;color:rgba(255,255,255,0.35);margin-bottom:40px}
  .back{display:inline-block;margin-bottom:32px;color:rgba(255,255,255,0.4);font-size:14px;text-decoration:none}
  .back:hover{color:#fff}
</style>
</head>
<body>
<div class="wrap">
  <a href="/" class="back">← Back to site</a>
  <h1>Privacy Policy</h1>
  <p class="updated">Last updated: March 7, 2026</p>

  <p>This privacy policy explains how ${name} ("we", "us") collects, uses, and protects information when you visit this website.</p>

  <h2>Information We Collect</h2>
  <p>When you contact us or submit a booking inquiry, we may collect your name, email address, and message content. We use this information solely to respond to your inquiry.</p>
  <p>This website does not use tracking cookies or third-party advertising scripts.</p>

  <h2>How We Use Your Information</h2>
  <p>Information you provide is used only to communicate with you about appointments, bookings, or inquiries. We do not sell, rent, or share your personal information with third parties.</p>

  <h2>Website Hosting</h2>
  <p>This site is hosted by <a href="https://getminted.ai">GetMinted</a>, an AI-powered website platform. GetMinted may collect anonymized usage analytics (page views, device type) to improve service performance. No personally identifiable information is shared with GetMinted without your consent.</p>

  <h2>Your Rights</h2>
  <p>You have the right to request access to, correction of, or deletion of any personal information we hold about you. To exercise these rights, contact us at <a href="mailto:${email}">${email}</a>.</p>

  <h2>Contact</h2>
  <p>Questions about this policy? Reach us at <a href="mailto:${email}">${email}</a>.</p>

  <p style="margin-top:48px;font-size:12px;color:rgba(255,255,255,0.25);">Powered by <a href="https://getminted.ai" style="color:rgba(255,255,255,0.25);">GetMinted</a></p>
</div>
</body>
</html>`;
}

const PRIVACY_LINK = `<a href="/privacy.html" style="color:rgba(255,255,255,0.4);font-size:12px;text-decoration:none;margin-left:16px;">Privacy Policy</a>`;

// Find all site directories
const dirs = fs.readdirSync(BASE, { withFileTypes: true })
  .filter(d => d.isDirectory() && !SKIP.has(d.name) && !d.name.startsWith('.') && !d.name.startsWith('_'))
  .map(d => d.name);

let privacyCount = 0;
let footerCount = 0;
let skipped = [];

for (const slug of dirs) {
  const indexPath = path.join(BASE, slug, 'index.html');
  if (!fs.existsSync(indexPath)) {
    skipped.push({ slug, reason: 'no index.html' });
    continue;
  }
  
  let html;
  try {
    html = fs.readFileSync(indexPath, 'utf8');
  } catch (e) {
    skipped.push({ slug, reason: 'read error' });
    continue;
  }
  
  // Skip if it doesn't look like a GetMinted site (no mint-credit or GetMinted reference)
  if (!html.includes('GetMinted') && !html.includes('getminted') && !html.includes('mint-credit') && !html.includes('Powered by')) {
    skipped.push({ slug, reason: 'not a GetMinted site' });
    continue;
  }
  
  const info = extractInfo(html);
  
  // Generate privacy.html
  const privacyHtml = generatePrivacyHtml(info.name, info.bg, info.accent, info.email);
  const privacyPath = path.join(BASE, slug, 'privacy.html');
  fs.writeFileSync(privacyPath, privacyHtml, 'utf8');
  privacyCount++;
  
  // Add footer link if not present
  if (!html.includes('privacy.html')) {
    // Insert after mint-credit line
    const mintCreditPattern = /<p class="mint-credit">.*?<\/p>/s;
    if (mintCreditPattern.test(html)) {
      html = html.replace(mintCreditPattern, (match) => {
        return match + '\n    <p class="mint-credit">' + PRIVACY_LINK + '</p>';
      });
      fs.writeFileSync(indexPath, html, 'utf8');
      footerCount++;
    } else {
      // Try inserting before </footer>
      if (html.includes('</footer>')) {
        html = html.replace('</footer>', '    <p style="margin-top:8px;">' + PRIVACY_LINK + '</p>\n  </footer>');
        fs.writeFileSync(indexPath, html, 'utf8');
        footerCount++;
      }
    }
  }
}

console.log(JSON.stringify({
  privacyPages: privacyCount,
  footerLinks: footerCount,
  skipped: skipped.length,
  skippedDetails: skipped,
  totalDirs: dirs.length
}, null, 2));
