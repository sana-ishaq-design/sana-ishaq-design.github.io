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
export default function ProjectOutcomes({outcomes}: {outcomes: readonly VerifiedOutcome[]}) {
  const approved = outcomes.filter(item => item.approval === 'owner-approved' && item.source.trim() && item.context.trim());
  if (!approved.length) return null;
  return h('section', {className:'project-outcomes page-frame', 'aria-label':'Project outcomes', 'data-count':approved.length},
    h('dl', {className:'outcome-list'}, approved.map(item => h('div', {key:item.id},
      h('dt', null, item.value),
      h('dd', null, h('span', {className:'outcome-label'}, item.label),
        h('p', null, item.context),
        h('a', {href:item.source}, 'Source and context'))))));
}
