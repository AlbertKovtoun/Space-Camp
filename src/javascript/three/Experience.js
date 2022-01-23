import * as THREE from "three"
import Stats from "stats.js"
import { Pane } from "tweakpane"

import { Camera } from "./Camera"
import { Renderer } from "./Renderer"
import { Sizes } from "./Sizes"
import { Camp } from "./Camp"
import { Lights } from "./Lights"

const stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)

export const pane = new Pane()
export const lightFolder = pane.addFolder({
  title: "Lights",
})

export const canvas = document.querySelector("canvas.webgl")

export const scene = new THREE.Scene()

export const camp = new Camp()

export const lights = new Lights()

export const sizes = new Sizes()

export const camera = new Camera()

export const renderer = new Renderer()

//Animate
const clock = new THREE.Clock()

const tick = () => {
  stats.begin()

  const elapsedTime = clock.getElapsedTime()

  // Update controls
  camera.controls.update()

  // Render
  renderer.renderer.render(scene, camera.camera)

  setTimeout(() => {
    window.requestAnimationFrame(tick)
  }, 1000 / 60)

  stats.end()
}

tick()
