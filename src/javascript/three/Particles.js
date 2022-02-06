import * as THREE from "three"

import coreVertexShader from "../../shaders/coreParticles/vertex.glsl"
import coreFragmentShader from "../../shaders/coreParticles/fragment.glsl"
import { scene } from "./Experience"

export class Particles {
  constructor() {
    this.setParticles()
  }

  setParticles() {
    const particleCount = 100000

    const geometry = new THREE.BufferGeometry()

    const positions = []
    const positionVectors = []
    const randoms = new Float32Array(particleCount)

    const n = 0.1,
      n2 = n / 2 // particles spread in the sphere + put sphere in center

    for (let i = 0; i < particleCount; i++) {
      // positions
      const x = Math.random() * n - n2
      const y = Math.random() * n - n2
      const z = Math.random() * n - n2

      positionVectors.push(new THREE.Vector3(x, y, z))

      if (positionVectors[i].distanceTo(new THREE.Vector3(0, 0, 0)) < n / 2) {
        positions.push(x, y, z)
        randoms[i] = Math.random()
      }
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    )
    geometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1))

    geometry.computeBoundingSphere()

    this.insideSphereMaterial = new THREE.ShaderMaterial({
      vertexShader: coreVertexShader,
      fragmentShader: coreFragmentShader,
      transparent: true,

      uniforms: {
        uTime: { value: 0 },
        uColor: {
          value: new THREE.Color(new THREE.Color(0xa8cfe7)),
        },
      },
    })

    this.insidePoints = new THREE.Points(geometry, this.insideSphereMaterial)
    this.insidePoints.position.set(-0.09, 0.31, -0.37)
    scene.add(this.insidePoints)
  }
}
