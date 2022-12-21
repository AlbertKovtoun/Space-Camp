import * as THREE from "three"
import { gsap } from "gsap"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { environment, helpers, scene, sizes } from "./Experience"

export class Camp {
  constructor() {
    this.loadingScreen = document.querySelector(".loading-screen")

    this.loadingManager = new THREE.LoadingManager(() => {
      this.setSolarPanelAnimations()
      this.setFractAnimation()
      this.setRoverHeadAnimation()
      this.setObjectsToTest()

      //Remove loading screen
      gsap.to(this.loadingScreen, {
        opacity: 0,
        duration: 4,
        ease: "power1.inOut",
        onComplete: () => {
          this.loadingScreen.style.display = "none"
        },
      })
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
    this.groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x7e98c1,
    })
    this.floorMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })
    this.doorFrameMaterial = new THREE.MeshStandardMaterial({ color: 0x7c7c7c })
    this.tubeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
    })
    this.windowMaterial = new THREE.MeshStandardMaterial({
      emissive: 0xffffff,
      emissiveIntensity: 1,
    })
    this.doorMaterial = new THREE.MeshStandardMaterial({
      color: 0xa8cfe7,
    })
    this.circleLightMaterial = new THREE.MeshStandardMaterial({
      // color: 0xa8cfe7,
      emissive: 0xa8cfe7,
    })
    this.lightMaterial = new THREE.MeshStandardMaterial({
      emissive: 0xff0000,
      emissiveIntensity: 2,
    })

    this.gltfLoader.load("/models/SpaceCamp12.gltf", (gltf) => {
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
      this.roverHead = this.camp.children.find((child) => {
        return child.name === "RoverHead"
      })
      this.roverBody = this.camp.children.find((child) => {
        return child.name === "RoverBody"
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

      this.camp.traverse((child) => {
        child.castShadow = true
        child.receiveShadow = true
      })

      for (const fract of this.fractMeshes) {
        fract.material = this.tubeMaterial
      }
      for (const solarPanel of this.solarPanelMeshes) {
        solarPanel.material = this.doorMaterial
      }

      scene.add(this.camp)
    })
  }

  setSolarPanelAnimations() {
    for (const solarPanel of this.solarPanelMeshes) {
      gsap.fromTo(
        solarPanel.rotation,
        {
          z: Math.PI / 12,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: Math.random() * 2,
        },
        {
          z: -Math.PI / 12,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: Math.random() * 2,
        }
      )
    }
  }

  setFractAnimation() {
    for (const fract of this.fractMeshes) {
      gsap.to(fract.position, {
        y: "+=0.06",
        duration: 5,
        repeat: -1,
        delay: Math.random() * 5,
        yoyo: true,
        ease: "power1.inOut",
      })
      gsap.to(fract.rotation, {
        x: Math.PI * Math.random() * 2,
        y: Math.PI * Math.random() * 2,
        duration: 5,
        repeat: -1,
        delay: Math.random() * 5,
        yoyo: true,
        ease: "power1.inOut",
      })
    }
  }

  setRoverHeadAnimation() {
    gsap.fromTo(
      this.roverHead.rotation,
      {
        z: Math.PI,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: Math.random() * 2,
      },
      {
        z: -Math.PI,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: Math.random() * 2,
      }
    )
  }

  setObjectsToTest() {
    //?For some reason roverHead and roverBody are groups and not meshes? And you can't raycast groups
    this.raycastObjects = [helpers.coreClickMesh]

    this.roverHead.traverse((child) => {
      this.raycastObjects.push(child)
    })
    this.roverBody.traverse((child) => {
      this.raycastObjects.push(child)
    })
  }
}
