import * as THREE from "three"
import CameraControls from "camera-controls"
CameraControls.install({ THREE: THREE })
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { canvas, renderer, scene, sizes } from "./Experience"

export class Camera {
  constructor() {
    this.camera
    this.controls

    this.setCamera()
    this.setCameraControls()
  }

  setCamera() {
    this.camera = new THREE.PerspectiveCamera(
      45,
      sizes.width / sizes.height,
      0.1,
      100
    )
    this.camera.position.set(-1.5, 1, 2)
    scene.add(this.camera)
  }

  setCameraControls() {
    // this.controls = new OrbitControls(this.camera, canvas)
    // this.controls.enableDamping = true

    this.controls = new CameraControls(this.camera, canvas)
    this.controls.dampingFactor = 0.00015
    this.controls.draggingDampingFactor = 0.00015
    this.controls.minPolarAngle = Math.PI / 8
    this.controls.maxPolarAngle = Math.PI / (2 + 0.2)
    // this.controls.dollySpeed = 0.1
    // this.controls.mouseButtons.right = CameraControls.ACTIONsNONE
  }
}
