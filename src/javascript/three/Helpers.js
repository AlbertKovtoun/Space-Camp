import * as THREE from "three"
import { helpersFolder, scene } from "./Experience"

export class Helpers {
  constructor() {
    this.visible = true

    if (this.visible) {
      this.setHelpers()
      this.setCoreClickArea()
      this.setHelpersTweaks()
    }
  }

  setHelpers() {
    this.roverPositionHelper = new THREE.Mesh(
      new THREE.SphereGeometry(0.01, 20, 20),
      new THREE.MeshBasicMaterial({ color: "red" })
    )
    this.roverPositionHelper.position.set(0.05, 0.3, 0.8)
    scene.add(this.roverPositionHelper)

    this.roverTargetHelper = new THREE.Mesh(
      new THREE.SphereGeometry(0.01, 20, 20),
      new THREE.MeshBasicMaterial({ color: "purple" })
    )
    this.roverTargetHelper.position.set(0.05, 0.2, 0.5)
    scene.add(this.roverTargetHelper)
  }

  setCoreClickArea() {
    this.coreClickMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 20, 20),
      new THREE.MeshBasicMaterial({
        color: "tomato",
        transparent: true,
        opacity: 1,
      })
    )
    this.coreClickMesh.position.set(0, 1, 0)
    scene.add(this.coreClickMesh)
  }

  setHelpersTweaks() {
    helpersFolder.addInput(this.roverPositionHelper.position, "x", {
      min: -1,
      max: 1,
      step: 0.01,
      label: "RoverPHx",
    })
    helpersFolder.addInput(this.roverPositionHelper.position, "y", {
      min: -1,
      max: 1,
      step: 0.01,
      label: "RoverPHy",
    })
    helpersFolder.addInput(this.roverPositionHelper.position, "z", {
      min: -1,
      max: 1,
      step: 0.01,
      label: "RoverPHz",
    })

    helpersFolder.addInput(this.roverTargetHelper.position, "x", {
      min: -1,
      max: 1,
      step: 0.01,
      label: "RoverTHx",
    })
    helpersFolder.addInput(this.roverTargetHelper.position, "y", {
      min: -1,
      max: 1,
      step: 0.01,
      label: "RoverTHy",
    })
    helpersFolder.addInput(this.roverTargetHelper.position, "z", {
      min: -1,
      max: 1,
      step: 0.01,
      label: "RoverTHz",
    })
  }
}
