import * as THREE from 'three';

export const TerrainShader = {
  uniforms: {
    uGrassColor: { value: new THREE.Color('#1e3a29') },
    uRockColor: { value: new THREE.Color('#3f4652') },
    uSnowColor: { value: new THREE.Color('#d1d5db') },
    uSunPosition: { value: new THREE.Vector3(100, 150, -200) },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying float vHeight;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      vHeight = worldPosition.y;
      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,
  fragmentShader: `
    uniform vec3 uGrassColor;
    uniform vec3 uRockColor;
    uniform vec3 uSnowColor;
    uniform vec3 uSunPosition;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying float vHeight;

    void main() {
      // Slope calculation (vertical normal component)
      float slope = vNormal.y;

      // Base texture blending based on slope and height
      vec3 baseColor = uGrassColor;

      // Steep slopes become rock face
      if (slope < 0.7) {
        float rockFactor = smoothstep(0.7, 0.4, slope);
        baseColor = mix(baseColor, uRockColor, rockFactor);
      }

      // High altitude snow caps
      if (vHeight > 25.0) {
        float snowFactor = smoothstep(25.0, 45.0, vHeight) * smoothstep(0.3, 0.8, slope);
        baseColor = mix(baseColor, uSnowColor, snowFactor);
      }

      // Simple directional sun lighting
      vec3 lightDir = normalize(uSunPosition - vWorldPosition);
      float diff = max(dot(vNormal, lightDir), 0.25);
      vec3 finalColor = baseColor * diff;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
};
