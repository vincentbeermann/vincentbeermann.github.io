export const locales = ['en', 'de'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.research': 'Research',
    'nav.speaking': 'Speaking & Coaching',
    'nav.contact': 'Contact',
    'home.selected': 'Selected publications',
    'home.allPublications': 'All publications',
    'home.workWithMe': 'Work with me',
    'pubs.title': 'Publications',
    'pubs.underReview': 'Preprints, under review & working papers',
    'pubs.statusUnderReview': 'under review',
    'pubs.statusWorkingPaper': 'working paper',
    'pubs.statusPreprint': 'preprint',
    'talks.title': 'Speaking, Workshops & Coaching',
    'talks.past': 'Past engagements',
    'talks.enquiry': 'Enquire about a talk, workshop, or coaching',
    'contact.title': 'Contact',
    'footer.imprint': 'Imprint',
    'footer.privacy': 'Privacy',
    'lang.switch': 'Deutsch',
    'lang.switchTo': '/de/',
  },
  de: {
    'nav.home': 'Start',
    'nav.research': 'Forschung',
    'nav.speaking': 'Vorträge & Coaching',
    'nav.contact': 'Kontakt',
    'home.selected': 'Ausgewählte Publikationen',
    'home.allPublications': 'Alle Publikationen',
    'home.workWithMe': 'Zusammenarbeit',
    'pubs.title': 'Publikationen',
    'pubs.underReview': 'Preprints, Under Review & Working Papers',
    'pubs.statusUnderReview': 'under review',
    'pubs.statusWorkingPaper': 'Working Paper',
    'pubs.statusPreprint': 'Preprint',
    'talks.title': 'Vorträge, Workshops & Coaching',
    'talks.past': 'Bisherige Auftritte',
    'talks.enquiry': 'Vortrag, Workshop oder Coaching anfragen',
    'contact.title': 'Kontakt',
    'footer.imprint': 'Impressum',
    'footer.privacy': 'Datenschutz',
    'lang.switch': 'English',
    'lang.switchTo': '/',
  },
} as const;

export type UiKey = keyof (typeof ui)['en'];

export function t(locale: Locale, key: UiKey): string {
  return ui[locale][key] ?? ui.en[key];
}

/** Pfad für die jeweils andere Sprache (einfaches Mapping /x ↔ /de/x). */
export function altLocalePath(pathname: string, locale: Locale): string {
  if (locale === 'en') {
    return pathname === '/' ? '/de/' : `/de${pathname}`;
  }
  const stripped = pathname.replace(/^\/de/, '');
  return stripped === '' || stripped === '/' ? '/' : stripped;
}
