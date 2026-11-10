import original from '../../case-studies/subscribe-me-case-study.html?raw';
export const plain=(html:string)=>html.replace(/<br\s*\/?\s*>/gi,' ').replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
const all=(pattern:RegExp)=>[...original.matchAll(pattern)].map(m=>plain(m[1]));
export const metadata=original.slice(original.indexOf('<title>'),original.indexOf('</script>',original.indexOf('<script type="application/ld+json">'))+9);
export const intro=all(/<p class="hero-sub">([\s\S]*?)<\/p>/g)[0];
export const body=all(/<p class="body-text[^>]*>([\s\S]*?)<\/p>/g);
export const challenges=all(/<div class="ch-title">([\s\S]*?)<\/div>/g).map((title,i)=>({title,problem:all(/<div class="ch-prob">([\s\S]*?)<\/div>/g)[i],response:all(/<div class="ch-resp">([\s\S]*?)<\/div>/g)[i]}));
export const journey=all(/<div class="jr-text">([\s\S]*?)<\/div>/g);
export const callouts=all(/<div class="cb-lbl">[^<]*<\/div>\s*<p>([\s\S]*?)<\/p>/g);
export const reflections=[...original.matchAll(/<div class="ri reveal">\s*<h4>([\s\S]*?)<\/h4>\s*<p>([\s\S]*?)<\/p>/g)].map(m=>({title:plain(m[1]),text:plain(m[2])}));
export const reviews=[...original.matchAll(/<div class="rv (?:pos|neg)">[\s\S]*?<p>([\s\S]*?)<\/p>\s*<div class="rv-attr">([\s\S]*?)<\/div>/g)].map(m=>({quote:plain(m[1]),attribution:plain(m[2])}));
if(challenges.length!==3||journey.length!==2||reflections.length!==4||reviews.length!==2||body.length!==8||callouts.length!==2)throw new Error('Subscribe source structure changed; review content mapping.');
export const screens={
 browse:['Browse Car - subscribe me.png',360,1318,'Browse cars by budget, class and mileage.'],
 vehicle:['Vehicle Details - subscribe me.png',1440,9412,'Vehicle details, package options, mileage, insurance, benefits and pricing.'],
 extras:['Extras Package - subscribe me.png',360,800,'Optional extras during the booking journey.'],
 package:['Package confirmation - subscribe me.png',1440,3200,'Package confirmation and selected inclusions.'],
 review:['Review & Paye - subscribe me.png',360,896,'Review and pay: package, extras, pickup, collection and price breakdown.'],
 confirmed:['Successful Booking - Subscribe me.png',1440,4160,'Successful booking and subscription details.'],
 pricing:['price breakdwown - subscribe me.png',570,428,'Itemized pricing breakdown before payment.'],
 dashboard:['Dashboard - subscribe me.png',1440,6136,'Subscription dashboard with booking and management actions.'],
 active:['Active Booking - subscribe me.png',360,1391,'Active booking details.'],
 service:['Request Service - subscribe me.png',360,906,'Accident and breakdown support entry points.'],
 swap:['Vehicle Swap - subscribe me.png',360,1318,'Vehicle swap workflow.'],
 accident:['Accident report - subscribe me.png',360,1078,'Report an accident.'],
 documents:['Booking Documents - subscribe me.png',360,800,'Subscriber documents: Emirates ID, driving licence and supporting records.'],
 profile:['Profile - subscribe me.png',360,828,'Subscriber profile.'],
 breakdown:['Report Breakdown - subscribe me.png',1440,3200,'Accident or breakdown report: document upload step.'],
 notice:['dashboard error - subscribe me.png',570,428,'Contract expiry notice with collection and extension actions.'],
 specs:['component librabry - subscribe me.png',3200,1600,'Original component specification excerpt with dimensions and handoff annotations.'],
 button:['button - subscribe me.png',400,250,'Original button component excerpt.'],
 card:['pricing card - subscribe me.png',400,250,'Original pricing card component excerpt.'],
} as const;
export type ScreenKey=keyof typeof screens;
