'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { roadCurve } from './RoadPath';
import { RoadShader } from './Shaders/RoadShader';

export function Road() {
  // Road surface geometry generated along spline
  const { roadGeometry, guardrailLeft, guardrailRight, bridgeMesh } = useMemo(() => {
    const tubularSegments = 400;
    const radius = 3.5;
    const radialSegments = 8;
    
    // Custom road ribbon geometry
    const points = roadCurve.getSpacedPoints(tubularSegments);
    const frenzyFrames = roadCurve.computeFrenetFrames(tubularSegments, false);
    
    const vertCount = (tubularSegments + 1) * 2;
    const positions = new Float32Array(vertCount * 3);
    const uvs = new Float32Array(vertCount * 2);
    const normals = new Float32Array(vertCount * 3);
    const indices = [];

    const halfWidth = 3.2;

    for (let i = 0; i <= tubularSegments; i++) {
      const pt = points[i];
      const binormal = frenzyFrames.binormals[i];
      const normal = frenzyFrames.normals[i];
      const progress = i / tubularSegments;

      // Left edge
      const leftPt = pt.clone().add(binormal.clone().multiplyScalar(-halfWidth));
      positions[i * 6] = leftPt.x;
      positions[i * 6 + 1] = leftPt.y;
      positions[i * 6 + 2] = leftPt.z;
      uvs[i * 4] = 0.0;
      uvs[i * 4 + 1] = progress * 40.0;
      normals[i * 6] = normal.x;
      normals[i * 6 + 1] = normal.y;
      normals[i * 6 + 2] = normal.z;

      // Right edge
      const rightPt = pt.clone().add(binormal.clone().multiplyScalar(halfWidth));
      positions[i * 6 + 3] = rightPt.x;
      positions[i * 6 + 4] = rightPt.y;
      positions[i * 6 + 5] = rightPt.z;
      uvs[i * 4 + 2] = 1.0;
      uvs[i * 4 + 3] = progress * 40.0;
      normals[i * 6 + 3] = normal.x;
      normals[i * 6 + 4] = normal.y;
      normals[i * 6 + 5] = normal.z;

      if (i < tubularSegments) {
        const row1 = i * 2;
        const row2 = (i + 1) * 2;
        indices.push(row1, row2, row1 + 1);
        indices.push(row1 + 1, row2, row2 + 1);
      }
    }

    const roadGeo = new THREE.BufferGeometry();
    roadGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    roadGeo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    roadGeo.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
    roadGeo.setIndex(indices);

    // Guardrail paths offset from road left and right
    const railGeoLeft = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(
        points.map((pt, idx) => pt.clone().add(frenzyFrames.binormals[idx].clone().multiplyScalar(-halfWidth - 0.2)).add(new THREE.Vector3(0, 0.6, 0)))
      ),
      200,
      0.1,
      6,
      false
    );

    const railGeoRight = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(
        points.map((pt, idx) => pt.clone().add(frenzyFrames.binormals[idx].clone().multiplyScalar(halfWidth + 0.2)).add(new THREE.Vector3(0, 0.6, 0)))
      ),
      200,
      0.1,
      6,
      false
    );

    return {
      roadGeometry: roadGeo,
      guardrailLeft: railGeoLeft,
      guardrailRight: railGeoRight,
      bridgeMesh: null
    };
  }, []);

  const roadMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(RoadShader.uniforms),
      vertexShader: RoadShader.vertexShader,
      fragmentShader: RoadShader.fragmentShader,
      side: THREE.DoubleSide
    });
  }, []);

  return (
    <group>
      {/* Asphalt Ribbon */}
      <mesh geometry={roadGeometry} material={roadMaterial} receiveShadow />

      {/* Steel Guardrails */}
      <mesh geometry={guardrailLeft}>
        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh geometry={guardrailRight}>
        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Scenic Valley Bridge Pillars at Testimonials section (Z = -330) */}
      <group position={[0, -2, -330]}>
        <mesh position={[-5, -15, 0]}>
          <boxGeometry args={[1.5, 30, 1.5]} />
          <meshStandardMaterial color="#475569" roughness={0.7} />
        </mesh>
        <mesh position={[5, -15, 0]}>
          <boxGeometry args={[1.5, 30, 1.5]} />
          <meshStandardMaterial color="#475569" roughness={0.7} />
        </mesh>
        <mesh position={[0, 10, 0]}>
          <boxGeometry args={[12, 1, 6]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}
