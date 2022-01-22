import * as THREE from "three"
import { scene } from "./Experience"

export class Lights {
  constructor() {
    this.setLights()
  }

  setLights() {
    const ambientLight = new THREE.AmbientLight(0xbbddff, 0.1)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xbbddff, 0.6)
    pointLight.position.set(0, 2, 2)
    pointLight.castShadow = true
    pointLight.shadow.normalBias = 0.05
    pointLight.shadow.mapSize.width = 1024 * 8
    pointLight.shadow.mapSize.height = 1024 * 8
    pointLight.shadow.radius = 10
    scene.add(pointLight)
  }
}
