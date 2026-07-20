'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useCameraMotion } from '@/context/CameraMotionContext';
import { TerrainShader } from './Shaders/TerrainShader';

export function Mountains() {
  const { stateRef } = useCameraMotion();

  // Mountain terrain geometry with procedural displacement
  const terrainGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(600, 700, 120, 140);
    geo.rotateX(-Math.PI / 2);
    
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      
      // Ridge noise formulas for alpine mountain shapes
      const distFromCenter = Math.abs(x);
      const valleyFactor = THREE.MathUtils.smoothstep(distFromCenter, 15, 60);
      
      const n1 = Math.sin(x * 0.02) * Math.cos(z * 0.02) * 25;
      const n2 = Math.sin(x * 0.05 + 1.2) * Math.sin(z * 0.04) * 12;
      const n3 = Math.cos(x * 0.1) * Math.cos(z * 0.1) * 5;
      
      let elevation = (n1 + n2 + n3 + 10) * valleyFactor;

      // Deep valley carves where road travels near center
      if (distFromCenter < 20) {
        elevation *= (distFromCenter / 20);
      }

      pos.setY(i, elevation - 5);
    }
    
    geo.computeVertexNormals();
    return geo;
  }, []);

  const terrainMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(TerrainShader.uniforms),
      vertexShader: TerrainShader.vertexShader,
      fragmentShader: TerrainShader.fragmentShader,
      side: THREE.DoubleSide
    });
  }, []);

  // Update terrain shader uniform based on the dynamic moon position
  useFrame((state) => {
    const s = stateRef.current;
    const p = s.progress;
    const xOffset = 110 - p * 80;
    const yOffset = 70 + p * 60;
    const zOffset = -480;
    const targetMoonPos = state.camera.position.clone().add(new THREE.Vector3(xOffset, yOffset, zOffset));

    if (terrainMaterial.uniforms.uSunPosition) {
      terrainMaterial.uniforms.uSunPosition.value.copy(targetMoonPos);
    }
  });

  // GPU Instanced Pine Trees (Cone + Cylinder)
  const treeCount = 600;
  const treeTransforms = useMemo(() => {
    const matrices: THREE.Matrix4[] = [];
    const tempMatrix = new THREE.Matrix4();
    const tempPos = new THREE.Vector3();
    const tempRot = new THREE.Euler();
    const tempScale = new THREE.Vector3();

    // Stateless deterministic pseudo-random generator
    const random = (i: number) => {
      const s = i * 15485863;
      const r = (s * s * s) % 233280;
      return Math.abs(r) / 233280;
    };

    let count = 0;
    let idx = 0;
    while (count < treeCount) {
      idx++;
      const x = (random(idx) - 0.5) * 450;
      const z = -random(idx + 1) * 550;
      
      // Don't place trees directly inside the road ribbon
      if (Math.abs(x) > 12) {
        const scale = 0.8 + random(idx + 2) * 1.4;
        const y = Math.max(0, (Math.sin(x * 0.02) * Math.cos(z * 0.02) * 25 + 5));
        
        tempPos.set(x, y, z);
        tempRot.set(0, random(idx + 3) * Math.PI * 2, 0);
        tempScale.set(scale, scale * (0.9 + random(idx + 4) * 0.4), scale);
        
        tempMatrix.compose(tempPos, new THREE.Quaternion().setFromEuler(tempRot), tempScale);
        matrices.push(tempMatrix.clone());
        count++;
      }
      idx += 5;
    }
    return matrices;
  }, [treeCount]);

  const treeMeshRef = React.useRef<THREE.InstancedMesh>(null);

  React.useEffect(() => {
    if (!treeMeshRef.current) return;
    treeTransforms.forEach((matrix, i) => {
      treeMeshRef.current?.setMatrixAt(i, matrix);
    });
    treeMeshRef.current.instanceMatrix.needsUpdate = true;
  }, [treeTransforms]);

  // Pine Cone Geometry
  const treeGeo = useMemo(() => {
    return new THREE.ConeGeometry(2.2, 7, 5);
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* Terrain Surface */}
      <mesh geometry={terrainGeo} material={terrainMaterial} receiveShadow castShadow />

      {/* Instanced Pine Forest */}
      <instancedMesh ref={treeMeshRef} args={[treeGeo, undefined, treeCount]}>
        <meshStandardMaterial color="#143622" roughness={0.8} flatShading />
      </instancedMesh>

      {/* Mountain Cabins & Boulders */}
      <group position={[-35, 4, -120]}>
        {/* Log Cabin near About Section Forest */}
        <mesh position={[0, 2, 0]}>
          <boxGeometry args={[6, 4, 8]} />
          <meshStandardMaterial color="#78350f" roughness={0.9} />
        </mesh>
        {/* Cabin Roof */}
        <mesh position={[0, 5, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[4.5, 4.5, 8.2]} />
          <meshStandardMaterial color="#451a03" roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}
