uniform vec3 uColor;
varying float progress;

varying vec2 vUv;

void main()
{

    vec2 xy = gl_PointCoord.xy - vec2(0.5);
    float ll = length(xy);
    float circleAlpha = step(ll, 0.5);

    float alpha = circleAlpha * 1. - progress;

    gl_FragColor = vec4(uColor, alpha);
}