import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export interface LoadedAvatar {
  scene: THREE.Group;
  animations: THREE.AnimationClip[];
  mixer: THREE.AnimationMixer;
}

const loader = new GLTFLoader();

export async function loadAvatarGLB(url: string): Promise<LoadedAvatar> {
  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (gltf) => {
        const scene = gltf.scene;
        const animations = gltf.animations;
        const mixer = new THREE.AnimationMixer(scene);

        scene.traverse((node) => {
          if (node instanceof THREE.Mesh) {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });

        scene.scale.set(1, 1, 1);

        resolve({
          scene,
          animations,
          mixer
        });
      },
      undefined,
      (error) => {
        console.error('Error loading avatar GLB:', error);
        reject(error);
      }
    );
  });
}

export function getAnimationClip(animations: THREE.AnimationClip[], name: string): THREE.AnimationClip | undefined {
  return animations.find((clip) => clip.name.toLowerCase().includes(name.toLowerCase()));
}

export function playAnimation(mixer: THREE.AnimationMixer, animationClip: THREE.AnimationClip, loop: boolean = true): THREE.AnimationAction {
  const action = mixer.clipAction(animationClip);
  if (loop) {
    action.clampWhenFinished = false;
  } else {
    action.clampWhenFinished = true;
  }
  action.play();
  return action;
}

export function stopAnimation(action: THREE.AnimationAction): void {
  action.stop();
}

export function createIdleCharacter(): THREE.Group {
  const group = new THREE.Group();

  const geometry = new THREE.CapsuleGeometry(0.3, 1.5, 8, 16);
  const material = new THREE.MeshStandardMaterial({
    color: 0x6495ed,
    metalness: 0.1,
    roughness: 0.8
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.position.y = 0.75;

  group.add(mesh);

  const headGeometry = new THREE.SphereGeometry(0.25, 32, 32);
  const headMesh = new THREE.Mesh(headGeometry, material);
  headMesh.castShadow = true;
  headMesh.receiveShadow = true;
  headMesh.position.set(0, 2, 0);

  group.add(headMesh);

  return group;
}
