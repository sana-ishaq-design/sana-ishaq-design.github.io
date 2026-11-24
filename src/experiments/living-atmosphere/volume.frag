#version 300 es
// Image-aware transmission field. The original artwork is never displaced.
precision highp float;
precision highp sampler3D;
uniform sampler3D uNoise;
uniform sampler2D uArtwork;
uniform vec2 uResolution,uImageSize,uCssSize;
uniform float uTime,uDensity,uLight,uDepth,uDark;
out vec4 color;
void main(){
 vec2 uv=gl_FragCoord.xy/uResolution;
 // Match the existing center/bottom background-size:cover registration.
 float scale=max(uCssSize.x/uImageSize.x,uCssSize.y/uImageSize.y);
 vec2 rendered=uImageSize*scale;
 vec2 imageUV=(uv*uCssSize-(uCssSize-rendered)*vec2(.5,0.))/rendered;
 float n=texture(uNoise,vec3(uv*vec2(1.3,2.1)+vec2(-uTime*.009,0.),.31+uTime*.002)).r;
 float detail=texture(uNoise,vec3(uv*vec2(3.2,4.7)-vec2(uTime*.006,0.),.72)).r;
 // Neighbouring slopes have different phases. Clearings reveal original
 // pixels, never invented detail. No image displacement or camera movement.
 float pocket=.5+.5*cos(uv.x*18.+uv.y*4.-7.-uTime*.36+(n-.5)*2.4);
 float density=smoothstep(.15,.88,pocket*.82+detail*.18);
 float valley=exp(-pow((uv.y-(.30+.035*sin(uv.x*7.)))/(.105*uDepth),2.));
 float edges=smoothstep(.02,.13,uv.x)*(1.-smoothstep(.87,.99,uv.x));
 float fog=(1.-exp(-density*3.*uDensity))*valley*edges;
 // Five static image taps soften local detail only where fog is dense.
 vec2 radius=vec2(4.5)/uImageSize;
 vec3 original=texture(uArtwork,imageUV).rgb;
 vec3 soft=original*.2;
 soft+=texture(uArtwork,imageUV+radius*vec2(1.,.55)).rgb*.2;
 soft+=texture(uArtwork,imageUV+radius*vec2(-1.,.55)).rgb*.2;
 soft+=texture(uArtwork,imageUV+radius*vec2(.65,-1.)).rgb*.2;
 soft+=texture(uArtwork,imageUV+radius*vec2(-.65,-1.)).rgb*.2;
 vec3 airlight=mix(vec3(.79,.83,.76),vec3(.39,.56,.59),uDark)*clamp(uLight,.6,1.3);
 vec3 obscured=mix(soft,airlight,.58);
 color=vec4(obscured*fog,fog);
}
