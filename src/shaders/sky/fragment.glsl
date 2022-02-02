uniform vec3 uBottomColor;
uniform vec3 uTopColor;

varying vec2 vUv;

void main()
{
    vec3 fade = mix(uBottomColor, uTopColor, vUv.y) * .8;

    gl_FragColor = vec4(fade, 1.0);
}