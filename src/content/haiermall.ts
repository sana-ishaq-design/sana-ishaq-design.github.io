import type {VerifiedOutcome} from '../components/ProjectOutcomes';

// Owner confirms the published case study is the authoritative verified baseline.
// Preserve Results values/labels/definitions exactly; alternate annotations are documented separately.
const source = '/case-studies/haiermall-case-study.html#results-grid';
export const haiermallOutcomes: readonly VerifiedOutcome[] = [
  {id:'online-sales',value:'+31%',label:'Online sales',context:'3 months post-launch',source,approval:'owner-approved'},
  {id:'bounce-rate',value:'−20%',label:'Bounce rate',context:'Homepage → category',source,approval:'owner-approved'},
  {id:'product-discovery',value:'+40%',label:'Faster product discovery',context:'Usability testing',source,approval:'owner-approved'},
  {id:'session-duration',value:'+15%',label:'Session duration',context:'Average session',source,approval:'owner-approved'},
];

export const haiermallAttribution = {
  text:'Performance metrics were provided by the product management and development teams following deployment.',
  source,
};
