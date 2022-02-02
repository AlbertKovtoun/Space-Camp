import * as THREE from "three"
import { scene } from "./Experience"

import skyVertexShader from "../../shaders/sky/vertex.glsl"
import skyFragmentShader from "../../shaders/sky/fragment.glsl"

export class Sky {
  constructor() {
    this.debugObject = {
      bottomColor: new THREE.Color(0x000000),
      topColor: new THREE.Color(0xbbddff),
    }

    this.setSky()
  }

  setSky() {
    this.skyGeometry = new THREE.SphereGeometry(10, 20, 20)
    this.skyMaterial = new THREE.ShaderMaterial({
      vertexShader: skyVertexShader,
      fragmentShader: skyFragmentShader,
      side: THREE.BackSide,

      uniforms: {
        uBottomColor: { value: this.debugObject.bottomColor },
        uTopColor: { value: this.debugObject.topColor },
      },
    })
    this.sky = new THREE.Mesh(this.skyGeometry, this.skyMaterial)
    scene.add(this.sky)
  }
}
