import * as THREE from "three"
import { sizes } from "./Experience"

export class Raycaster {
  constructor() {
    this.setRaycaster()
  }

  setRaycaster() {
    this.raycaster = new THREE.Raycaster()

    this.mouse = new THREE.Vector2()

    window.addEventListener("mousemove", (event) => {
      this.mouse.x = (event.clientX / sizes.width) * 2 - 1
      this.mouse.y = -(event.clientY / sizes.height) * 2 + 1
    })
  }
}
