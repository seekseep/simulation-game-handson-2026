import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CAMERA, CONTROLS, LIGHT, RENDERER, ROOM, SCENE, ANIMAL, FAN } from './config.js';
import { createAnimal, createFan, createRoom } from './objects/factory.js';

export default class AvaterView extends EventTarget {

  /** @type {HTMLElement} */
  element;

  /** @type {THREE.Scene} */
  scene;

  /** @type {THREE.PerspectiveCamera} */
  camera;

  /** @type {THREE.WebGLRenderer} */
  renderer;

  /** @type {import('./objects/Animal.js').Animal | null} */
  animal;

  /** @type {import('./objects/Fan.js').default | null} */
  fan;

  /** @type {Array<THREE.AnimationMixer>} */
  mixers;

  /** @type {THREE.Clock} */
  clock;

  /** @type {OrbitControls} */
  controls;

  constructor() {
    super();

    this.animal = null;
    this.fan = null;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(SCENE.BACKGROUND_COLOR);
    this.scene = scene;

    const cameraAspect = RENDERER.DEFAULT_WIDTH / RENDERER.DEFAULT_HEIGHT;
    const camera = new THREE.PerspectiveCamera(
      CAMERA.FOV,
      cameraAspect,
      CAMERA.NEAR,
      CAMERA.FAR
    );
    this.camera = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: RENDERER.ANTIALIAS,
      alpha: true
    });
    renderer.setSize(
      RENDERER.DEFAULT_WIDTH, RENDERER.DEFAULT_HEIGHT
    );
    renderer.shadowMap.enabled = RENDERER.SHADOW_MAP_ENABLED;
    this.renderer = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = CONTROLS.ENABLE_DAMPING;
    controls.dampingFactor = CONTROLS.DAMPING_FACTOR;
    this.controls = controls;

    // Add lights
    const ambientLight = new THREE.AmbientLight(LIGHT.COLOR, LIGHT.AMBIENT_INTENSITY);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(LIGHT.COLOR, LIGHT.DIRECTIONAL_INTENSITY);
    directionalLight.position.copy(LIGHT.DIRECTIONAL_POSITION);
    directionalLight.castShadow = LIGHT.CAST_SHADOW;
    scene.add(directionalLight);

    camera.position.copy(CAMERA.DEFAULT_POSITION);
    controls.target.copy(CAMERA.DEFAULT_TARGET);
    controls.update();

    this.mixers = [];
    this.clock = new THREE.Clock();

    this.element = renderer.domElement;

    this.initObjects();

    this.animate();

    let resizeTimeout;
    let observingParent = null;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const parent = this.element.parentElement;

        // 親要素が変わった場合、新しい親を observe
        if (parent && parent !== observingParent) {
          if (observingParent) {
            resizeObserver.unobserve(observingParent);
          }
          resizeObserver.observe(parent);
          observingParent = parent;
        }

        const width = parent ? parent.clientWidth : RENDERER.DEFAULT_WIDTH;
        const height = parent ? parent.clientHeight : RENDERER.DEFAULT_HEIGHT;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }, 100);
    });

    // this.element 自体を observe して、親が追加されたときのサイズ変化を検出
    this.element.classList.add('avaterView');
    resizeObserver.observe(this.element);
  }

  /**
   *
   * @param {typeof import('./objects/Animal.js').MOTIONS[keyof typeof import('./objects/Animal.js').ObjectNameByMotionName]} animalMotionName
   */
  async initObjects () {
    const [
      room,
      fan,
      animal
    ] = await Promise.all([
      createRoom(),
      createFan(),
      createAnimal()
    ])

    room.model.position.copy(ROOM.POSITION);
    room.model.rotation.copy(ROOM.ROTATION);
    room.model.scale.copy(ROOM.SCALE);
    this.scene.add(room.model);

    animal.model.position.copy(ANIMAL.POSITION);
    animal.model.rotation.copy(ANIMAL.ROTATION);
    animal.model.scale.copy(ANIMAL.SCALE);
    animal.enableClick(this.camera, this.renderer.domElement);
    animal.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('animal-click', { detail: { target: animal } }));
    });
    this.scene.add(animal.model);
    this.mixers.push(animal.mixer);
    this.animal = animal;

    fan.model.position.copy(FAN.POSITION);
    fan.model.rotation.copy(FAN.ROTATION);
    fan.model.scale.copy(FAN.SCALE);
    this.scene.add(fan.model);
    this.mixers.push(fan.mixer);
    this.fan = fan;
    fan.enableClick(this.camera, this.renderer.domElement);
    fan.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('fan-click', { detail: { target: fan } }));
    });

    this.dispatchEvent(new Event('load'));
  }

  /**
   * @param {Parameters<typeof import('./objects/Animal.js').Animal.prototype.changeMotion>[0]} motionName
   */
  changeAnimalMotion (motionName) {
    if (!this.animal) {
      console.warn('No animal loaded yet');
      return;
    }
    this.animal.changeMotion(motionName);
  }

  animate () {
    const delta = this.clock.getDelta();

    this.controls.update();

    this.mixers.forEach((mixer) => {
      if (!mixer) return;
      mixer.update(delta);
    });

    this.renderer.render(this.scene, this.camera);

    window.requestAnimationFrame(() => this.animate());
  }
}
