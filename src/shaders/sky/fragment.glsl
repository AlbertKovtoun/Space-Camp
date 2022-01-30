varying vec2 vUv;

void main()
{
    float fade = vUv.y;

    gl_FragColor = vec4(vec3(fade), 1.0);
}