import * as THREE from "three"
import { gsap } from "gsap"
import { pane, lightFolder, scene } from "./Experience"

export class Lights {
  constructor() {
    this.setLights()
    this.setSolarPanelLightsAnimations()
    this.setLightTweaks()
  }

  setLights() {
    this.tubeLights = []
    this.tubeLightHelpers = []

    const ambientLight = new THREE.AmbientLight(0xbbddff, 0.1)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xbbddff, 0.4)
    pointLight.position.set(0, 2, 2)
    pointLight.castShadow = true
    pointLight.shadow.normalBias = 0.05
    pointLight.shadow.mapSize.width = 1024 * 4
    pointLight.shadow.mapSize.height = 1024 * 4
    pointLight.shadow.radius = 10
    scene.add(pointLight)

    this.solarPanelLight1 = new THREE.PointLight(0xff0000, 0.8, 0.5, 2.5)
    const solarPanelLight1Helper = new THREE.PointLightHelper(
      this.solarPanelLight1,
      0.02
    )
    this.solarPanelLight1.position.set(0.5, 0.359, 0.326)
    scene.add(this.solarPanelLight1, solarPanelLight1Helper)

    this.solarPanelLight2 = new THREE.PointLight(0xff0000, 0.8, 0.5, 2.5)
    const solarPanelLight2Helper = new THREE.PointLightHelper(
      this.solarPanelLight2,
      0.02
    )
    this.solarPanelLight2.position.set(0.546, 0.359, -0.076)
    scene.add(this.solarPanelLight2, solarPanelLight2Helper)

    for (let i = 0; i < 4; i++) {
      this.tubeLights.push(new THREE.PointLight(0xfa8cfe7, 0.6, 0.5, 2))
      this.tubeLightHelpers.push(
        new THREE.PointLightHelper(this.tubeLights[i], 0.02)
      )
      scene.add(this.tubeLights[i], this.tubeLightHelpers[i])
    }
    this.tubeLights[0].position.set(-0.328, 0.239, 0.326)
    this.tubeLights[1].position.set(-0.283, 0.239, 0.326)
    this.tubeLights[2].position.set(0.13, 0.239, 0.326)
    this.tubeLights[3].position.set(0.176, 0.239, 0.326)

    this.circleLight = new THREE.PointLight(0xa8cfe7, 0.6, 0.5, 2)
    this.circleLightHelper = new THREE.PointLightHelper(this.circleLight, 0.02)
    this.circleLight.position.set(-0.506, 0.266, 0.461)
    scene.add(this.circleLight, this.circleLightHelper)
  }

  setSolarPanelLightsAnimations() {
    let lightSwitch

    setInterval(() => {
      lightSwitch = !lightSwitch
      this.solarPanelLight1.visible = lightSwitch
      this.solarPanelLight2.visible = lightSwitch 
    }, 2000)
  }

  setLightTweaks() {
    for (let i = 0; i < this.tubeLights.length; i++) {
      lightFolder.addInput(this.tubeLights[i].position, "x", {
        min: -0.5,
        max: 0.5,
        step: 0.001,
        label: `TubeLight${i}x`,
      })
      lightFolder.addInput(this.tubeLights[i].position, "y", {
        min: -0.5,
        max: 0.5,
        step: 0.001,
        label: `TubeLight${i}y`,
      })
      lightFolder.addInput(this.tubeLights[i].position, "z", {
        min: -0.5,
        max: 0.5,
        step: 0.001,
        label: `TubeLight${i}z`,
      })
    }

    lightFolder.addInput(this.solarPanelLight1.position, "x", {
      min: -0.5,
      max: 0.5,
      step: 0.001,
      label: "SolLight1x",
    })
    lightFolder.addInput(this.solarPanelLight1.position, "y", {
      min: -0.5,
      max: 0.5,
      step: 0.001,
      label: "SolLight1y",
    })
    lightFolder.addInput(this.solarPanelLight1.position, "z", {
      min: -0.5,
      max: 0.5,
      step: 0.001,
      label: "SolLight1z",
    })
    lightFolder.addInput(this.solarPanelLight2.position, "x", {
      min: -0.5,
      max: 0.75,
      step: 0.001,
      label: "SolLight2x",
    })
    lightFolder.addInput(this.solarPanelLight2.position, "y", {
      min: -0.5,
      max: 0.5,
      step: 0.001,
      label: "SolLight2y",
    })
    lightFolder.addInput(this.solarPanelLight2.position, "z", {
      min: -0.5,
      max: 0.5,
      step: 0.001,
      label: "SolLight2z",
    })

    lightFolder.addInput(this.circleLight.position, "x", {
      min: -0.6,
      max: 0.75,
      step: 0.001,
      label: "CircleLightx",
    })
    lightFolder.addInput(this.circleLight.position, "y", {
      min: -0.6,
      max: 0.5,
      step: 0.001,
      label: "CircleLighty",
    })
    lightFolder.addInput(this.circleLight.position, "z", {
      min: -0.6,
      max: 0.5,
      step: 0.001,
      label: "CircleLightz",
    })
  }
}
