#version 300 es
// Adapted from leoawen/volumetric-clouds (MIT, Leonardo Soares Gonçalves, 2025).
// Retains dual-lobe scattering, box intersection and front-to-back absorption.
// New: orthographic mist bank, procedural density, transparent DOM composition.
precision highp float;
precision highp sampler3D;
uniform sampler3D uNoise;
uniform vec2 uResolution;
uniform float uTime,uDensity,uLight,uDepth,uDark;
uniform int uSteps;
out vec4 color;
const float PI=3.14159265359;
float HenyeyGreenstein(float g,float mu){float gg=g*g;return (1.0/(4.0*PI))*((1.0-gg)/pow(1.0+gg-2.0*g*mu,1.5));}
float PhaseFunction(float g,float costh){return mix(HenyeyGreenstein(-g,costh),HenyeyGreenstein(g,costh),0.8);}
vec2 hitBox(vec3 orig,vec3 dir){vec3 inv=1.0/dir;vec3 a=(-vec3(.5)-orig)*inv,b=(vec3(.5)-orig)*inv;vec3 lo=min(a,b),hi=max(a,b);return vec2(max(lo.x,max(lo.y,lo.z)),min(hi.x,min(hi.y,hi.z)));}
float densityAt(vec3 p){
 vec3 drift=vec3(uTime*.027,0.,uTime*.009);
 vec3 q=vec3(p.x*1.65,p.y*2.3,p.z*.85)+drift;
 float large=texture(uNoise,q*.8).r;
 float detail=texture(uNoise,q*2.8+vec3(0.,uTime*.003,0.)).r;
 float n=large*.78+detail*.22;
 float band=exp(-pow((p.y+.16+sin(p.x*5.+p.z*3.)*.045)/(.06*uDepth+.025),2.));
 float edges=smoothstep(-.5,-.34,p.x)*(1.-smoothstep(.25,.5,p.x));
 return smoothstep(.35,.67,n)*band*edges*uDensity*10.;
}
void main(){
 vec2 uv=gl_FragCoord.xy/uResolution;
 vec3 origin=vec3(uv.x-.5,(uv.y-.5)*.8,1.4),dir=normalize(vec3(.001,.001,-1.));
 vec2 bounds=hitBox(origin,dir);if(bounds.x>=bounds.y){color=vec4(0.);return;}
 float ds=(bounds.y-bounds.x)/float(uSteps);
 float jitter=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453);
 vec3 p=origin+(bounds.x+jitter*ds)*dir;
 float trans=1.;vec3 accumulated=vec3(0.);
 vec3 lightDir=normalize(vec3(-.5,.65,.6));
 vec3 ambient=mix(vec3(.66,.75,.70),vec3(.30,.48,.52),uDark);
 vec3 sunlight=mix(vec3(.99,.96,.82),vec3(.67,.83,.88),uDark);
 float phase=PhaseFunction(.3,dot(dir,-lightDir));
 for(int i=0;i<48;i++){
  if(i>=uSteps||trans<.015)break;
  float d=densityAt(p);
  if(d>.005){
   float shadow=exp(-(densityAt(p+lightDir*.08)+densityAt(p+lightDir*.17))*.09);
   vec3 illumination=ambient*.45+sunlight*shadow*(.45+phase*1.5)*uLight;
   float stepTrans=exp(-d*ds*1.6);
   accumulated+=trans*(1.-stepTrans)*illumination;
   trans*=stepTrans;
  }
  p+=dir*ds;
 }
 float fade=smoothstep(0.,.14,uv.y)*(1.-smoothstep(.77,1.,uv.y));
 // Premultiplied alpha: retain mountains through the gaps in the volume.
 color=vec4(accumulated*fade,(1.-trans)*fade);
}
