import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';

test('outcomes omit absent/unapproved records and adapt to approved result counts',async()=>{
  const {default:ProjectOutcomes}=await import('../src/components/ProjectOutcomes.ts');
  const render=outcomes=>renderToStaticMarkup(createElement(ProjectOutcomes,{outcomes}));
  assert.equal(render([]),'');
  const fixture={id:'test-result',value:'Test value',label:'Test definition',context:'Synthetic fixture; never portfolio content',source:'/case-studies/haiermall-case-study.html',approval:'pending'};
  assert.equal(render([fixture]),'');
  assert.equal(render([{...fixture,approval:'owner-approved',source:''}]),'');
  for(const count of [1,2,3,4]){
    const html=render(Array.from({length:count},(_,i)=>({...fixture,id:`test-${i}`,approval:'owner-approved'})));
    assert.match(html,new RegExp(`data-count="${count}"`));
    assert.equal((html.match(/<dt>/g)||[]).length,count);
    assert.equal((html.match(/Source and context/g)||[]).length,count);
    assert.doesNotMatch(html,/pending|Homepage|Checkout/);
  }
});
