// uniform vec3 uColor;
varying float progress;

varying vec2 vUv;

void main()
{

    vec2 xy = gl_PointCoord.xy - vec2(0.5);
    float ll = length(xy);
    float alpha = step(ll, 0.5);

    gl_FragColor = vec4(vec3(1.0), 1.0 - progress * .5);
}