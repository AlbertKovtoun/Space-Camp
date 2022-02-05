import * as THREE from "three"
import { camera, camp, sizes } from "./Experience"

export class Raycaster {
  constructor() {
    this.currentIntersect = null
    this.setRaycaster()
    this.checkClick()
  }

  setRaycaster() {
    this.raycaster = new THREE.Raycaster()

    this.mouse = new THREE.Vector2()

    window.addEventListener("mousemove", (event) => {
      this.mouse.x = (event.clientX / sizes.width) * 2 - 1
      this.mouse.y = -(event.clientY / sizes.height) * 2 + 1
    })
  }

  checkHover() {
    if (camp.raycastObjects) {
      // console.log(camp.roverBody.children)

      this.raycaster.setFromCamera(this.mouse, camera.camera)

      const intersects = this.raycaster.intersectObjects(camp.raycastObjects)

      if (intersects.length) {
        if (!this.currentIntersect) {
          console.log("MOUSE ENTERED ITEM")
        }
        this.currentIntersect = intersects[0]
      } else {
        if (this.currentIntersect) {
          console.log("MOUSE LEFT ITEM")
        }
        this.currentIntersect = null
      }
    }
  }

  checkClick() {
    window.addEventListener("click", () => {
      if (this.currentIntersect) {
        if (this.currentIntersect.object.name.includes("Rover")) {
          camera.transitionToRover()
        }
      }
    })
  }
}
