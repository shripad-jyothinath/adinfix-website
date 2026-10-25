const fs = require('fs');
const path = require('path');

const root = __dirname;
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

const navItems = [
  { key: 'home', label: 'Home', href: 'index.html' },
  { key: 'about', label: 'About', href: 'about.html' },
  { key: 'services', label: 'Services', href: 'services.html' },
  { key: 'work', label: 'Work', href: 'work.html' },
  { key: 'insights', label: 'Insights', href: 'insights.html' },
  { key: 'contact', label: 'Contact', href: 'contact.html' }
];

const logos = [
  ['Zebronics', 'zebronics.jpg'],
  ['Tata Motors', 'tata-motors.jpg'],
  ['Royal Enfield', 'royal-enfield.jpg'],
  ['Renault', 'renault.jpg'],
  ['L&T Valves', 'lt-valves.jpg'],
  ['Kapleshwar', 'kapleshwar.jpg'],
  ['Isuzu', 'isuzu.jpg'],
  ['Hyundai', 'hyundai.jpg'],
  ['HCL', 'hcl.jpg'],
  ['Ford', 'ford.jpg'],
  ['FL Smidth', 'fl-smidth.jpg'],
  ['Eurogrip', 'eurogrip.jpg'],
  ['Equitas', 'equitas.jpg'],
  ['CSS Corp', 'css-corp.jpg'],
  ['CNSI', 'cnsi.jpg'],
  ['Aparajitha', 'aparajitha.jpg']
];

const logoCards = logos.map(([name, file]) => `
  <div class="logo-card">
    <img src="assets/img/${file}" alt="${name}" decoding="async">
  </div>`).join('');

const navMarkup = (active) => navItems.map((item) => `
  <a class="nav-link${active === item.key ? ' active' : ''}" href="${item.href}"${active === item.key ? ' aria-current="page"' : ''}>${item.label}</a>`).join('');

const mobileNavMarkup = (active) => navItems.map((item, i) => `
  <a class="mobile-link${active === item.key ? ' active' : ''}" href="${item.href}"${active === item.key ? ' aria-current="page"' : ''}>
    <span class="mobile-link-index">0${i + 1}</span>
    <span>${item.label}</span>
    <span class="mobile-link-arrow">↗</span>
  </a>`).join('');

const header = `
<a class="skip-link" href="#main">Skip to content</a>
<div class="page-loader" aria-hidden="true">
  <div class="page-loader-inner">
    <span class="page-loader-word">adinfix</span>
    <span class="page-loader-line"><span></span></span>
    <span class="page-loader-tag">Engaging minds. Elevating metrics.</span>
  </div>
</div>
<div class="scroll-progress" aria-hidden="true"><span data-scroll-progress></span></div>

<header class="site-header" data-header>
  <div class="header-inner">
    <a class="brand" href="index.html" aria-label="Adinfix home">
      <img src="assets/img/logo-white.png" alt="Adinfix" width="150" height="64">
    </a>

    <nav class="desktop-nav" aria-label="Primary">
      {{NAV}}
    </nav>

    <div class="header-actions">
      <a class="header-phone" href="tel:+919445283041">+91 94452 83041</a>
      <a class="btn btn-small btn-yellow" href="contact.html">Book a growth audit <span class="arrow">↗</span></a>
      <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu" data-menu-toggle>
        <span></span><span></span>
      </button>
    </div>
  </div>
</header>

<div class="mobile-menu" id="mobile-menu" aria-hidden="true" data-mobile-menu>
  <div class="mobile-menu-top">
    <span class="micro-label">Menu</span>
    <span class="micro-label">Chennai · Since 1983</span>
  </div>
  <nav class="mobile-nav" aria-label="Mobile">
    {{MOBILE_NAV}}
  </nav>
  <div class="mobile-menu-foot">
    <a href="mailto:mail@adinfix.com">mail@adinfix.com</a>
    <a href="tel:+919445283041">+91 94452 83041</a>
    <a class="btn btn-yellow" href="contact.html">Book a growth audit <span class="arrow">↗</span></a>
  </div>
</div>
`;

const footer = `
<footer class="site-footer">
  <div class="footer-top container">
    <div class="footer-brand">
      <a href="index.html" aria-label="Adinfix home">
        <img src="assets/img/logo-white.png" alt="Adinfix" width="170" height="72" loading="lazy">
      </a>
      <p class="footer-tagline">Engaging minds.<br>Elevating metrics.</p>
      <p class="footer-note">A full-service advertising and growth agency in Chennai, working with brands that refuse to blend in.</p>
      <div class="footer-socials">
        <a href="https://in.linkedin.com/company/adinfix" target="_blank" rel="noreferrer" aria-label="Adinfix on LinkedIn">in</a>
        <a href="mailto:mail@adinfix.com" aria-label="Email Adinfix">@</a>
        <a href="tel:+919445283041" aria-label="Call Adinfix">↗</a>
      </div>
    </div>

    <div class="footer-col">
      <p class="footer-heading">Explore</p>
      <a href="about.html">About</a>
      <a href="services.html">Services</a>
      <a href="work.html">Work</a>
      <a href="insights.html">Insights</a>
      <a href="contact.html">Contact</a>
    </div>

    <div class="footer-col">
      <p class="footer-heading">Services</p>
      <a href="services.html#brand">Brand strategy</a>
      <a href="services.html#web">Website &amp; eCommerce</a>
      <a href="services.html#seo">Advanced SEO</a>
      <a href="services.html#performance">Performance marketing</a>
      <a href="services.html#social">Social &amp; influencer</a>
      <a href="services.html#content">Content marketing</a>
      <a href="services.html#video">Video marketing</a>
      <a href="services.html#traditional">Traditional media</a>
      <a href="services.html#consultancy">Consultancy &amp; training</a>
    </div>

    <div class="footer-col footer-contact">
      <p class="footer-heading">Start a conversation</p>
      <a href="mailto:mail@adinfix.com">mail@adinfix.com</a>
      <a href="tel:+919445283041">+91 94452 83041</a>
      <a href="tel:+914424353372">044 2435 3372</a>
      <p class="footer-address">A1, 1st Floor, New No. 11,<br>7th Street, Nandanam Extension,<br>Chennai 600035</p>
      <a class="footer-map" href="https://g.co/kgs/97AMLPM" target="_blank" rel="noreferrer">Open in Maps <span>↗</span></a>
    </div>
  </div>

  <div class="footer-newsletter container">
    <div>
      <p class="micro-label">The occasional useful note</p>
      <p class="footer-newsletter-copy">One email a month on brand, performance and the systems that make growth compound.</p>
    </div>
    <div class="newsletter-form-wrap">
      <form class="newsletter-form" data-newsletter>
        <label class="sr-only" for="newsletter-email">Email address</label>
        <input id="newsletter-email" name="email" type="email" placeholder="you@company.com" required>
        <button type="submit" class="btn btn-yellow">Subscribe <span class="arrow">↗</span></button>
      </form>
      <p class="form-status" role="status" aria-live="polite"></p>
    </div>
  </div>

  <div class="footer-bottom container">
    <p>© {{YEAR}} Adinfix Advertising Pvt Ltd. All rights reserved.</p>
    <div class="footer-legal">
      <a href="privacy.html">Privacy</a>
      <a href="terms.html">Terms</a>
      <span>Chennai, India</span>
    </div>
  </div>
</footer>
`;

function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AdvertisingAgency',
    name: 'Adinfix Advertising Pvt Ltd',
    url: 'https://adinfix.com/',
    logo: 'https://adinfix.com/assets/img/logo-white.png',
    image: 'https://adinfix.com/assets/img/og-cover.png',
    description: 'Full-service advertising and growth agency in Chennai, connecting brand, performance and technology since 1983.',
    foundingDate: '1983',
    telephone: '+91-94452-83041',
    email: 'mail@adinfix.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'A1, 1st Floor, New No. 11, 7th Street, Nandanam Extension',
      addressLocality: 'Chennai',
      addressRegion: 'Tamil Nadu',
      postalCode: '600035',
      addressCountry: 'IN'
    },
    sameAs: ['https://in.linkedin.com/company/adinfix'],
    areaServed: 'IN',
    priceRange: 'Custom scope'
  };
}

const serviceFaqs = [
  ['Do you work with in-house marketing teams?', 'Yes. We can lead the work, plug into an existing team, or operate as the extra senior bench your team needs. The model is built around clear ownership, not turf.'],
  ['How quickly can we start?', 'A growth audit usually takes two to three weeks, depending on access to data and stakeholders. Most engagements begin with that diagnostic so the first move is based on evidence, not assumption.'],
  ['Do you handle traditional media as well as digital?', 'Yes. Adinfix has planned and bought print, TV, FM and OOH since the 1980s. We still believe the channel should follow the audience, not the other way around.'],
  ['What does success look like?', 'We agree on a small set of business measures before work begins: pipeline, qualified leads, revenue, retention or share of search. Reach and engagement can matter, but they are not the finish line.'],
  ['What budgets do you work with?', 'We work with growth budgets rather than a fixed minimum. The scope is designed around the outcome, the category and the speed you need. Tell us what you are trying to achieve and we will tell you what it takes.']
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: serviceFaqs.map(([q, a]) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a }
  }))
};

const contactFaqs = [
  ['Do you work with businesses outside Chennai?', 'Yes. Chennai is home, but the work is not limited by pin code. We work with teams across India and internationally, with a mix of in-person and remote sessions.'],
  ['How quickly can we start?', 'A growth audit usually takes two to three weeks, depending on access to data and stakeholders. Most engagements begin with that diagnostic.'],
  ['What budgets do you work with?', 'We work with growth budgets rather than a fixed minimum. The scope is designed around the outcome, the category and the speed you need.'],
  ['Will we work with the same team throughout?', 'Yes. The senior lead in the first conversation is the senior lead on the work. We keep the team deliberately lean so the thinking does not get handed off.'],
  ['Can you work with our existing agency or in-house team?', 'Yes. We can lead, support or work alongside an existing team. The important thing is that someone owns the loop, not that every task sits with us.']
];

const contactFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: contactFaqs.map(([q, a]) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a }
  }))
};

const pages = [
  {
    out: 'index.html',
    nav: 'home',
    body: 'home-page',
    title: 'Adinfix — Full-service growth agency in Chennai',
    desc: 'Adinfix connects brand, performance and technology into one growth loop. A full-service advertising agency in Chennai, trusted by 150+ brands since 1983.',
    schema: [organizationSchema()]
  },
  {
    out: 'about.html',
    nav: 'about',
    body: 'about-page',
    title: 'About Adinfix — Four decades of making brands matter',
    desc: 'Since 1983, Adinfix has helped brands connect strategy, creative, media and technology. Meet the team and the thinking behind the work.',
    schema: [organizationSchema()]
  },
  {
    out: 'services.html',
    nav: 'services',
    body: 'services-page',
    title: 'Services — Brand, performance, technology and media | Adinfix',
    desc: 'Nine connected capabilities: brand strategy, web and eCommerce, SEO, performance marketing, social, content, video, traditional media and consultancy.',
    schema: [organizationSchema(), faqSchema]
  },
  {
    out: 'work.html',
    nav: 'work',
    body: 'work-page',
    title: 'Work — Selected outcomes from Adinfix',
    desc: 'Selected client outcomes across search, web experience, recruitment marketing, B2B strategy and integrated campaigns.',
    schema: [organizationSchema()]
  },
  {
    out: 'insights.html',
    nav: 'insights',
    body: 'insights-page',
    title: 'Insights — Useful thinking on brand, performance and growth | Adinfix',
    desc: 'Notes on answer-engine search, fragmented agency stacks, creative that converts and the systems that make growth compound.',
    schema: [organizationSchema()]
  },
  {
    out: 'contact.html',
    nav: 'contact',
    body: 'contact-page',
    title: 'Contact Adinfix — Book a growth audit',
    desc: 'Tell us what is not working. Book a 30-minute growth audit with Adinfix in Chennai, or write to mail@adinfix.com.',
    schema: [organizationSchema(), contactFaqSchema]
  },
  {
    out: 'insight-answer-engines.html',
    nav: 'insights',
    body: 'article-page',
    title: 'The answer-engine era: getting found when Google starts answering | Adinfix',
    desc: 'Search is becoming an answer surface. Here is how brands can stay visible across Google, AI Overviews, ChatGPT, Perplexity and Claude.',
    schema: [organizationSchema(), {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'The answer-engine era: getting found when Google starts answering',
      description: 'How brands stay visible as search becomes an answer surface.',
      datePublished: '2026-10-08',
      dateModified: '2026-10-08',
      author: { '@type': 'Organization', name: 'Adinfix Editorial' },
      publisher: { '@type': 'Organization', name: 'Adinfix' }
    }]
  },
  {
    out: 'insight-fragmented-agencies.html',
    nav: 'insights',
    body: 'article-page',
    title: 'The hidden cost of a fragmented agency stack | Adinfix',
    desc: 'Five specialists, five dashboards and no single owner of the number. The real cost of fragmentation — and a better operating model.',
    schema: [organizationSchema(), {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'The hidden cost of a fragmented agency stack',
      description: 'Why splitting brand, performance and technology across agencies slows growth.',
      datePublished: '2026-09-18',
      dateModified: '2026-09-18',
      author: { '@type': 'Organization', name: 'Adinfix Editorial' },
      publisher: { '@type': 'Organization', name: 'Adinfix' }
    }]
  },
  {
    out: 'insight-creative-that-converts.html',
    nav: 'insights',
    body: 'article-page',
    title: 'Creative that converts: a brief for the algorithm and the human | Adinfix',
    desc: 'The best-performing creative does two jobs at once: it stops the scroll and gives the brain a reason to act. A practical brief.',
    schema: [organizationSchema(), {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Creative that converts: a brief for the algorithm and the human',
      description: 'A practical creative brief for performance marketing that still builds the brand.',
      datePublished: '2026-08-27',
      dateModified: '2026-08-27',
      author: { '@type': 'Organization', name: 'Adinfix Editorial' },
      publisher: { '@type': 'Organization', name: 'Adinfix' }
    }]
  },
  {
    out: 'privacy.html',
    nav: '',
    body: 'legal-page',
    title: 'Privacy Policy | Adinfix',
    desc: 'How Adinfix handles the information you share through this website.',
    schema: [organizationSchema()]
  },
  {
    out: 'terms.html',
    nav: '',
    body: 'legal-page',
    title: 'Terms of Use | Adinfix',
    desc: 'The terms that apply to your use of the Adinfix website.',
    schema: [organizationSchema()]
  },
  {
    out: '404.html',
    nav: '',
    body: 'not-found-page',
    title: 'Page not found | Adinfix',
    desc: 'That page took a wrong turn. Head back to Adinfix or explore our services.',
    noindex: true,
    schema: [organizationSchema()]
  }
];

function renderSchema(schemaArray) {
  return schemaArray.map((schema) => `
  <script type="application/ld+json">${JSON.stringify(schema)}</script>`).join('');
}

for (const page of pages) {
  const contentPath = `src/pages/${page.out}`;
  if (!fs.existsSync(path.join(root, contentPath))) {
    console.warn(`Missing content: ${contentPath}`);
    continue;
  }

  let content = read(contentPath);
  content = content.replaceAll('{{LOGOS}}', logoCards + logoCards);

  const html = `<!doctype html>
<html lang="en" class="no-js">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#190812">
  ${page.noindex ? '<meta name="robots" content="noindex,nofollow">' : ''}
  <title>${page.title}</title>
  <meta name="description" content="${page.desc}">
  <link rel="canonical" href="https://adinfix.com/${page.out === 'index.html' ? '' : page.out}">
  <meta property="og:type" content="${page.body === 'article-page' ? 'article' : 'website'}">
  <meta property="og:site_name" content="Adinfix">
  <meta property="og:title" content="${page.title}">
  <meta property="og:description" content="${page.desc}">
  <meta property="og:url" content="https://adinfix.com/${page.out === 'index.html' ? '' : page.out}">
  <meta property="og:image" content="https://adinfix.com/assets/img/og-cover.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${page.title}">
  <meta name="twitter:description" content="${page.desc}">
  <link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
  <link rel="preload" href="assets/fonts/fraunces-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="assets/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="assets/img/logo-white.png" as="image">
  <link rel="stylesheet" href="assets/css/style.css">
  <noscript><style>.page-loader{display:none!important}.reveal{opacity:1!important;transform:none!important}.hero-title .line>span{transform:none!important}</style></noscript>
  ${renderSchema(page.schema)}
</head>
<body class="${page.body}" data-page="${page.nav}">
  ${header.replace('{{NAV}}', navMarkup(page.nav)).replace('{{MOBILE_NAV}}', mobileNavMarkup(page.nav))}
  <main id="main">
${content}
  </main>
  ${footer.replaceAll('{{YEAR}}', String(new Date().getFullYear()))}
  <script src="assets/js/lottie.min.js" defer></script>
  <script src="assets/js/main.js" defer></script>
</body>
</html>`;

  fs.writeFileSync(path.join(root, page.out), html);
  console.log(`Built ${page.out}`);
}
