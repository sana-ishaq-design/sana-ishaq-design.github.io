export const chapters=[['overview','The utility'],['research','Assumptions'],['decisions','Create'],['screens','Export'],['system','Handoff'],['outcomes','Reflection']] as const;
export const images={
 overview:['Overview - Barcode.png','Supplied design artifact: light and dark Create screens.'],
 flow:['Userflow - Barcode.png','Designed flow from choosing a symbology to single or batch export.'],
 createLight:['Create Light - Barcode.png','Create design artifact in light mode: format, content and preview.'],
 createDark:['Create Dark - Barcode.png','Create design artifact in dark mode with header theme controls.'],
 exportLight:['Export Light - Barcode.png','Export design artifact in light mode with single and batch controls.'],
 exportDark:['Export Dark - Barcde.png','Export design artifact in dark mode with file-format tiles.'],
 aboutLight:['About Light - Barcode.png','Supplied light About design with shortcuts, feedback and developer credit.'],
 aboutDark:['About Dark - Barcode.png','Supplied dark About design with privacy messaging and GitHub feedback.'],
 typography:['typography - Barcode.png','Design typography excerpt: IBM Plex Sans tab and section-label specifications.'],
 tokens:['color palette - barcode.png','Design colour-token excerpt with named surfaces, text and component colours.'],
 handoff:['documentation - Barcode.png','Annotated developer handoff with numbered elements, dimensions and token references.']
} as const;
export const assumptions=['Task completion in under 30 seconds.','Users generate one format at a time.','Batch export is a secondary use case.','Users prefer automatic theme detection.','Privacy messaging improves completion.'];
export const store='https://chromewebstore.google.com/detail/barcode-studio/lknamljgoemoejklldglbpjbbagnjbab';
export const source='https://github.com/zfhassaan/barcode-studio/tree/e803b79129ef59836027ef013aea11aa3b04c364';
