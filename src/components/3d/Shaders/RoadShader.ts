import * as THREE from 'three';

export const RoadShader = {
  uniforms: {
    uTime: { value: 0 },
    uRoadColor: { value: new THREE.Color('#1a1c23') },
    uLineColor: { value: new THREE.Color('#f59e0b') },
    uEdgeColor: { value: new THREE.Color('#ffffff') },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vWorldPosition;
    varying vec3 vNormal;

    void main() {
      vUv = uv;
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,
  fragmentShader: `
    uniform vec3 uRoadColor;
    uniform vec3 uLineColor;
    uniform vec3 uEdgeColor;
    varying vec2 vUv;
    varying vec3 vWorldPosition;
    varying vec3 vNormal;

    float rand(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    void main() {
      float noise = rand(vUv * 500.0) * 0.08;
      vec3 color = uRoadColor + noise;

      float centerDist = abs(vUv.x - 0.5);
      float dash = step(0.4, fract(vUv.y * 80.0));
      float centerLine = step(centerDist, 0.012) * dash;

      float edgeDistLeft = abs(vUv.x - 0.04);
      float edgeDistRight = abs(vUv.x - 0.96);
      float edgeLine = step(edgeDistLeft, 0.008) + step(edgeDistRight, 0.008);

      color = mix(color, uLineColor, centerLine);
      color = mix(color, uEdgeColor, clamp(edgeLine, 0.0, 1.0));

      gl_FragColor = vec4(color, 1.0);
    }
  `
};
