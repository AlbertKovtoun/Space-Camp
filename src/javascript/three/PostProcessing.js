import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { BokehPass } from "three/examples/jsm/postprocessing/BokehPass"
import { camera, renderer, scene } from "./Experience"

export class PostProcessing {
  constructor() {
    this.setPostProcessing()
  }

  setPostProcessing() {
    this.composer = new EffectComposer(renderer.renderer)

    this.renderPass = new RenderPass(scene, camera.camera)
    this.composer.addPass(this.renderPass)

    //BloomPass
    this.unrealBloomPass = new UnrealBloomPass()
    this.unrealBloomPass.strength = 0.3
    this.unrealBloomPass.radius = 1
    this.unrealBloomPass.threshold = 0.6
    this.composer.addPass(this.unrealBloomPass)
    // this.unrealBloomPass.enabled = false

    //DOF
    this.bokehPass = new BokehPass(scene, camera.camera, {
      focus: 2,
      aperture: 0.025,
      maxblur: 0.002,
    })
    this.bokehPass.enabled = false
    this.composer.addPass(this.bokehPass)
  }
}
