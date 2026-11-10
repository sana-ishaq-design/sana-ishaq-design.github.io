export interface CollectionProject {
 id:string; title:string; description:string; subtitle?:string; label:string;
 thumbnail:{name:string;width:number;height:number;alt:string};url:string;
 categories:string[];published:boolean;order:number;featured:boolean;role:string;
 highlight?:string;highlightContext?:string;source:string;
}
