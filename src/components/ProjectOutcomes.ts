import {createElement as h} from 'react';

export interface VerifiedOutcome {
  id: string;
  value: string;
  label: string;
  context: string;
  source: string;
  approval: 'owner-approved';
}

/** Static HTML only. No examples or inferred results belong in the project dataset. */
export default function ProjectOutcomes({outcomes,attribution,compact=false}: {
  outcomes: readonly VerifiedOutcome[];
  attribution?: {text:string; source:string};
  compact?: boolean;
}) {
  const approved = outcomes.filter(item => item.approval === 'owner-approved' && item.source.trim() && item.context.trim());
  if (!approved.length) return null;
  return h('section', {className:'project-outcomes page-frame', 'aria-label':'Project outcomes', 'data-count':approved.length},
    h('dl', {className:'outcome-list'}, approved.map(item => h('div', {key:item.id},
      h('dt', null, item.value),
      h('dd', null, h('span', {className:'outcome-label'}, item.label),
        h('p', null, item.context),
        !attribution && !compact && h('a', {href:item.source}, 'Source and context'))))),
    attribution && !compact && h('p', {className:'outcome-attribution'}, attribution.text, ' ',
      h('a', {href:attribution.source}, 'Published results and reporting context')));
}
