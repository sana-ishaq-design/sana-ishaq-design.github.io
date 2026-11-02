export interface ProjectNote {
  slug:string; name:string; category:string; role:string; context:string; decision:string;
  contribution:string; source:string; image:string; width:number; height:number; provenance:string;
}

// Project-specific excerpts/facts from the unchanged published case studies.
// Reference-only names without repository materials are intentionally not invented.
export const projectNotes: readonly ProjectNote[] = [
  {
    slug:'barcode-studio',name:'Barcode Studio',category:'Chrome extension · Product design',
    role:'End-to-End UX · Design + Handoff',
    context:'Barcode Studio lets users generate QR codes and linear barcodes — EAN-13, Code 128, UPC-A — directly inside a Chrome popup and export them as PNG, SVG, WebP, or PDF, individually or in bulk.',
    decision:'No account. No server. No tab switch required.',
    contribution:'The product serves a precise moment: a user is mid-task, needs a barcode in seconds, and does not want the overhead of a new tab, an account, or an external upload.',
    source:'/case-studies/barcode-studio-case-study.html',image:'barcode',width:1200,height:900,
    provenance:'case-studies/barcode-studio-case-study.html:537–547,569–573',
  },
  {
    slug:'subscribe-me',name:'Subscribe Me',category:'Car subscription · Mobile app',role:'UI Designer · Delivery Phase',
    context:'Subscribe Me launched as Dubai\'s first digital-native car subscription platform.',
    decision:'Designing for the decision, not the transaction.',
    contribution:'Delivered production UI across booking flows, checkout experience, and design system components — stepping in mid-project to maintain delivery across 6 agile sprints.',
    source:'/case-studies/subscribe-me-case-study.html',image:'subscribe-browse',width:360,height:1318,
    provenance:'case-studies/subscribe-me-case-study.html:478–487,562; index.html:447',
  },
  {
    slug:'utworx',name:'UTWorX',category:'Enterprise SaaS · Asset management',role:'Lead UI/UX Designer',
    context:'UTWorX is an enterprise SaaS platform for asset and maintenance management — helping facility managers, maintenance supervisors, technicians, and schedulers track assets, manage work orders, schedule preventive maintenance, and monitor operational performance.',
    decision:'The product team\'s brief was precise: make the platform easier to use without changing what it does.',
    contribution:'The redesign had to serve three distinct user roles simultaneously — each with different information needs, different frequency of use, and different levels of time pressure.',
    source:'/case-studies/utworx-case-study.html',image:'utworx-overview',width:4320,height:4008,
    provenance:'case-studies/utworx-case-study.html:463–473,492–495',
  },
  {
    slug:'haiermall',name:'HaierMall',category:'E-commerce · Web',role:'Lead UI/UX Designer',
    context:'HaierMall is the official Haier e-commerce platform for home appliances and consumer electronics.',
    decision:'The redesign shifted the experience from a flat inventory display to a structured journey that orients, guides, and builds confidence at every stage.',
    contribution:'Reviews elevated above specs. Dominant CTA. Decision sequence restructured.',
    source:'/case-studies/haiermall-case-study.html',image:'haier-home',width:1440,height:1929,
    provenance:'case-studies/haiermall-case-study.html:225,232,401–402,823–824',
  },
];
