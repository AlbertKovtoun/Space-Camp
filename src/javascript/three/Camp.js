import * as THREE from "three"
import { gsap } from "gsap"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { scene, sizes } from "./Experience"

export class Camp {
  constructor() {
    this.loadingManager = new THREE.LoadingManager(() => {
      this.setSolarPanelAnimations()
    })
    this.gltfLoader = new GLTFLoader(this.loadingManager)
    this.loadEnvMap()
    this.loadCamp()
  }

  loadEnvMap() {}

  loadCamp() {
    this.chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0,
      metalness: 0.8,
    })
    this.groundMaterial = new THREE.MeshStandardMaterial({ color: 0x7e98c1 })
    this.floorMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })
    this.doorFrameMaterial = new THREE.MeshStandardMaterial({ color: 0x7c7c7c })
    this.tubeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
    })
    this.windowMaterial = new THREE.MeshStandardMaterial({
      color: 0x0000ff,
    })
    this.doorMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ff00,
    })
    this.circleLightMaterial = new THREE.MeshStandardMaterial({
      color: "pink",
    })
    this.lightMaterial = new THREE.MeshStandardMaterial({
      color: "red",
    })

    this.gltfLoader.load("/assets/models/SpaceCamp8.gltf", (gltf) => {
      this.camp = gltf.scene

      //Retrieve meshes
      this.fractMeshes = []
      this.solarPanelMeshes = []

      this.chromeObjectsMesh = this.camp.children.find((child) => {
        return child.name === "ChromeObjects"
      })
      this.groundObjectMesh = this.camp.children.find((child) => {
        return child.name === "GroundObject"
      })
      this.floorObjectMesh = this.camp.children.find((child) => {
        return child.name === "FloorObject"
      })
      this.doorFrameObjectMesh = this.camp.children.find((child) => {
        return child.name === "DoorFrameObject"
      })
      this.tubeObjectsMesh = this.camp.children.find((child) => {
        return child.name === "TubeObjects"
      })
      this.windowObjectsMesh = this.camp.children.find((child) => {
        return child.name === "Windows"
      })
      this.doorObjectsMesh = this.camp.children.find((child) => {
        return child.name === "DoorObjects"
      })
      this.circleLightObjectMesh = this.camp.children.find((child) => {
        return child.name === "CircleLightObject"
      })
      this.LightObjectMesh = this.camp.children.find((child) => {
        return child.name === "LightObject"
      })

      //?Not the best way to do it for sure
      for (let i = 1; i < 32; i++) {
        this.fractMeshes.push(
          this.camp.children.find((child) => {
            return child.name === `Fract${i}`
          })
        )
      }
      for (let i = 1; i < 3; i++) {
        this.solarPanelMeshes.push(
          this.camp.children.find((child) => {
            return child.name === `SolarPanel${i}`
          })
        )
      }

      //Apply materials
      this.chromeObjectsMesh.material = this.chromeMaterial
      this.groundObjectMesh.material = this.groundMaterial
      this.floorObjectMesh.material = this.floorMaterial
      this.doorFrameObjectMesh.material = this.doorFrameMaterial
      this.tubeObjectsMesh.material = this.tubeMaterial
      this.windowObjectsMesh.material = this.windowMaterial
      this.doorObjectsMesh.material = this.doorMaterial
      this.circleLightObjectMesh.material = this.circleLightMaterial
      this.LightObjectMesh.material = this.lightMaterial

      for (const fract of this.fractMeshes) {
        fract.material = this.tubeMaterial
      }
      for (const solarPanel of this.solarPanelMeshes) {
        solarPanel.material = this.doorMaterial
      }

      this.camp.traverse((child) => {
        child.castShadow = true
        child.receiveShadow = true
      })

      scene.add(this.camp)
    })
  }

  setSolarPanelAnimations() {}
}