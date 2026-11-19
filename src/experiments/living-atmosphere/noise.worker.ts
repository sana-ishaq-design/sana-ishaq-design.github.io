// Original periodic value-noise volume. No external image assets.
const size=48,data=new Uint8Array(size**3);
const hash=(x:number,y:number,z:number)=>{let n=Math.imul(x,374761393)^Math.imul(y,668265263)^Math.imul(z,2147483647);n=Math.imul(n^(n>>>13),1274126177);return ((n^(n>>>16))>>>0)/4294967295;};
const mix=(a:number,b:number,t:number)=>a+(b-a)*t;
function noise(x:number,y:number,z:number,period:number){
 const ix=Math.floor(x),iy=Math.floor(y),iz=Math.floor(z),smooth=(t:number)=>t*t*(3-2*t);
 const tx=smooth(x-ix),ty=smooth(y-iy),tz=smooth(z-iz),v=(a:number,b:number,c:number)=>hash((ix+a)%period,(iy+b)%period,(iz+c)%period);
 return mix(mix(mix(v(0,0,0),v(1,0,0),tx),mix(v(0,1,0),v(1,1,0),tx),ty),mix(mix(v(0,0,1),v(1,0,1),tx),mix(v(0,1,1),v(1,1,1),tx),ty),tz);
}
for(let z=0;z<size;z++)for(let y=0;y<size;y++)for(let x=0;x<size;x++){
 let n=0;for(let o=0;o<3;o++){const p=4*2**o;n+=noise(x/size*p,y/size*p,z/size*p,p)*[.58,.28,.14][o];}
 data[x+size*(y+size*z)]=Math.round(n*255);
}
self.postMessage({data,size}, {transfer:[data.buffer]});
