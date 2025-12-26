import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Animal } from './Animal.js';
import Fan from './Fan.js';
import Room from './Room.js';

export const GLTF_PATHS = Object.freeze({
  ROOM: '/assets/js/avater-view/objects/glb/isometric_room.glb',
  FAN: '/assets/js/avater-view/objects/glb/table_fan.glb',
  ANIMAL: '/assets/js/avater-view/objects/glb/quirky_series_-_free_animals_pack.glb',
});

/**
 *
 * @param {string} gltfPath
 * @param {{ new (...args: any[]): T }} ObjectClass
 * @returns {Promise<T>}
 */
async function loadAndCreate (gltfPath, ObjectClass) {
  const loader = new GLTFLoader();
  const gltf = await loader.loadAsync(gltfPath);
  return new ObjectClass(gltf);
}

/**
 *
 * @returns {Promise<Animal>}
 */
export async function createAnimal () {
  return loadAndCreate(GLTF_PATHS.ANIMAL, Animal);
}

/**
 *
 * @returns {Promise<Fan>}
 */
export async function createFan () {
  return loadAndCreate(GLTF_PATHS.FAN, Fan);
}

/**
 *
 * @returns {Promise<Room>}
 */
export async function createRoom () {
  return loadAndCreate(GLTF_PATHS.ROOM, Room);
}
