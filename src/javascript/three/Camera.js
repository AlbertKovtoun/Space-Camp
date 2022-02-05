import * as THREE from "three"
import CameraControls from "camera-controls"
CameraControls.install({ THREE: THREE })
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { camera, canvas, helpers, renderer, scene, sizes } from "./Experience"

export class Camera {
  constructor() {
    this.camera
    this.controls
    this.cameraPosition = {
      x: -1.5,
      y: 1,
      z: 2,
    }

    this.setCamera()
    this.setCameraControls()
    this.setSmoothScroll()
  }

  setCamera() {
    this.camera = new THREE.PerspectiveCamera(
      45,
      sizes.width / sizes.height,
      0.1,
      100
    )
    this.camera.position.set(
      this.cameraPosition.x,
      this.cameraPosition.y,
      this.cameraPosition.z
    )
    scene.add(this.camera)
  }

  setCameraControls() {
    // this.controls = new OrbitControls(this.camera, canvas)
    // this.controls.enableDamping = true

    this.controls = new CameraControls(this.camera, canvas)
    this.controls.dampingFactor = 0.0001
    this.controls.draggingDampingFactor = 0.0001
    this.controls.minPolarAngle = Math.PI / 8
    this.controls.maxPolarAngle = Math.PI / (2 + 0.2)
    this.controls.maxDistance = 8
    // this.controls.dollySpeed = 0.1
    // this.controls.mouseButtons.right = CameraControls.ACTION.NONE
    this.controls.mouseButtons.wheel = CameraControls.ACTION.NONE
  }

  setSmoothScroll() {
    const scrollAmount = 0.1
    this.minZoomDistance = 1
    this.maxZoomDistance = 3
    this.distanceToCenter = this.camera.position.distanceTo(
      new THREE.Vector3(0, 0, 0)
    )

    window.onwheel = (e) => {
      if (e.deltaY >= 0) {
        // Scrolling Down with mouse
        if (this.distanceToCenter < this.maxZoomDistance) {
          this.controls.dollyTo((this.distanceToCenter += scrollAmount), true)
        }
      } else {
        // Scrolling Up with mouse
        if (this.distanceToCenter > this.minZoomDistance) {
          this.controls.dollyTo((this.distanceToCenter -= scrollAmount), true)
        }
      }
    }
  }

  setRoverState() {
    this.controls.setLookAt(0.05, 0.3, 0.8, 0.05, 0.2, 0.5, true)
    setTimeout(() => {
      this.minZoomDistance = 0.3
      this.maxZoomDistance = 0.4
      this.distanceToCenter = this.camera.position.distanceTo(
        new THREE.Vector3(0.05, 0.2, 0.5)
      )
      console.log(this.distanceToCenter)
    }, 2000)
  }

  transitionToRover() {
    console.log("Transitioning to Rover!")
    this.setRoverState()
  }
}
