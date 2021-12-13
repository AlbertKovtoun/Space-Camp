import * as THREE from "three"
import { canvas, sizes } from "./Experience"

export class Renderer {
  constructor() {
    this.renderer

    this.setRenderer()
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    })
    this.renderer.setSize(sizes.width, sizes.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }
}
