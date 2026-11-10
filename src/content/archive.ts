export interface ArchiveProject {
  slug:string; name:string; category:string; published:boolean;
  image:string; imageAlt:string; width:number; height:number;
  overview:string; role:string; contribution:string; decisions:readonly string[];
}
// Content gate: reference-only names have no verified project copy or source assets.
// Full case studies stay in Selected Work, never in this collection.
export const archiveProjects:readonly ArchiveProject[]=[];
const fullCaseStudies=new Set(['haiermall','subscribe-me','subscribe-a-car','utworx','barcode-studio']);
export const publishedArchiveProjects=archiveProjects.filter(project=>project.published&&!fullCaseStudies.has(project.slug));
