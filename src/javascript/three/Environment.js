import * as THREE from "three"

export class Environment {
  constructor() {
    this.cubeTextureLoader = new THREE.CubeTextureLoader()
    this.setEnvironment()
  }

  setEnvironment() {
    // this.environmentMap = this.cubeTextureLoader.load([
    //   "/assets/1/px.png",
    //   "/assets/1/nx.png",
    //   "/assets/1/py.png",
    //   "/assets/1/ny.png",
    //   "/assets/1/pz.png",
    //   "/assets/1/nz.png",
    // ])
  }
}
