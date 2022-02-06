import * as THREE from "three"
import Stats from "stats.js"
import { Pane } from "tweakpane"

import { Camera } from "./Camera"
import { Renderer } from "./Renderer"
import { Sizes } from "./Sizes"
import { Camp } from "./Camp"
import { Lights } from "./Lights"
import { PostProcessing } from "./PostProcessing"
import { Sky } from "./Sky"
import { Snow } from "./Snow"
import { Environment } from "./Environment"
import { Raycaster } from "./Raycaster"
import { Helpers } from "./Helpers"
import { Particles } from "./Particles"

const stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)

export const pane = new Pane()
export const lightFolder = pane.addFolder({
  title: "Lights",
  expanded: false,
})
export const postProcessingFolder = pane.addFolder({
  title: "PostProcessing",
})
export const helpersFolder = pane.addFolder({
  title: "Helpers",
})

export const canvas = document.querySelector("canvas.webgl")

export const scene = new THREE.Scene()

export const environment = new Environment()

export const camp = new Camp()

export const lights = new Lights()

export const sky = new Sky()

export const snow = new Snow()

export const particles = new Particles()

export const helpers = new Helpers()

export const cameraState = "overview"

export const sizes = new Sizes()

export const camera = new Camera()

export const raycaster = new Raycaster()

export const renderer = new Renderer()

export const postProcessing = new PostProcessing()

//Animate
const clock = new THREE.Clock()

const tick = () => {
  stats.begin()

  const elapsedTime = clock.getElapsedTime()

  snow.insideSphereMaterial.uniforms.uTime.value = elapsedTime
  particles.insideSphereMaterial.uniforms.uTime.value = elapsedTime

  particles.insidePoints.rotation.y = elapsedTime * 0.01

  //Raycast
  raycaster.checkHover()

  //! Update controls
  // camera.controls.update()
  camera.controls.update(10)

  // Render
  // renderer.renderer.render(scene, camera.camera)
  postProcessing.composer.render()

  setTimeout(() => {
    window.requestAnimationFrame(tick)
  }, 1000 / 120)

  stats.end()
}

tick()
