import * as THREE from "three"
// import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
// import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
// import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
// import { BokehPass } from "three/examples/jsm/postprocessing/BokehPass"
import { camera, renderer, scene } from "./Experience"

import { SSREffect, defaultSSROptions } from "screen-space-reflections"
import * as POSTPROCESSING from "postprocessing"

import { BloomEffect, EffectComposer, EffectPass, RenderPass } from "postprocessing"
import { SSRDebugGUI } from "./SSRDebugGUI"

export class PostProcessing {
  constructor() {
    this.setPostProcessing()
  }

  // setPostProcessing() {
  //   this.composer = new EffectComposer(renderer.renderer)

  //   this.renderPass = new RenderPass(scene, camera.camera)
  //   this.composer.addPass(this.renderPass)

  //   //BloomPass
  //   this.unrealBloomPass = new UnrealBloomPass()
  //   this.unrealBloomPass.strength = 0.3
  //   this.unrealBloomPass.radius = 1
  //   this.unrealBloomPass.threshold = 0.6
  //   this.composer.addPass(this.unrealBloomPass)
  //   // this.unrealBloomPass.enabled = false

  //   //DOF
  //   // this.bokehPass = new BokehPass(scene, camera.camera, {
  //   //   focus: 2,
  //   //   aperture: 0.025,
  //   //   maxblur: 0.002,
  //   // })
  //   // this.bokehPass.enabled = false
  //   // this.composer.addPass(this.bokehPass)
  // }

  setPostProcessing() {
    this.composer = new POSTPROCESSING.EffectComposer(renderer.renderer)
    this.composer.addPass(new RenderPass(scene, camera.camera))
    const ssrEffect = new SSREffect(scene, camera.camera, {
      intensity: 1,
      exponent: 1,
      distance: 10,
      fade: 0,
      roughnessFade: 1,
      thickness: 10,
      ior: 1.45,
      maxRoughness: 1,
      maxDepthDifference: 10,
      blend: 0.9,
      correction: 1,
      correctionRadius: 1,
      blur: 0.5,
      blurKernel: 1,
      blurSharpness: 10,
      jitter: 0,
      jitterRoughness: 0,
      steps: 20,
      refineSteps: 5,
      missedRays: true,
      useNormalMap: false,
      useRoughnessMap: false,
      resolutionScale: 1,
      velocityResolutionScale: 1,
    })
    const ssrPass = new POSTPROCESSING.EffectPass(camera.camera, ssrEffect)

    this.composer.addPass(new EffectPass(camera.camera, new BloomEffect()))

    this.composer.addPass(ssrPass)

    // const giu = new SSRDebugGUI(ssrEffect, defaultSSROptions)
  }
}
