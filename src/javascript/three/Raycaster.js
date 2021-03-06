import * as THREE from "three"
import { camera, camp, helpers, sizes } from "./Experience"

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
          // console.log("MOUSE ENTERED ITEM")
          document.body.style.cursor = "pointer"
        }
        this.currentIntersect = intersects[0]
      } else {
        if (this.currentIntersect) {
          // console.log("MOUSE LEFT ITEM")
          document.body.style.cursor = "default"
        }
        this.currentIntersect = null
      }
    }
  }

  checkClick() {
    const roverContainer = document.querySelector(".rover-container")
    const coreContainer = document.querySelector(".core-container")

    window.addEventListener("click", () => {
      if (this.currentIntersect) {
        if (this.currentIntersect.object.name.includes("coreClick")) {
          coreContainer.classList.add("active")
          camera.orbitToCore()
        }
        if (this.currentIntersect.object.name.includes("Rover")) {
          // camera.transitionToRover()
          roverContainer.classList.add("active")
          camera.orbitToRover()
        }
      }
    })
  }
}
