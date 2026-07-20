import * as THREE from 'three';

// Waypoints defining mountain highway journey across sections (0.0 to 1.0 scroll)
export const highwayWaypoints = [
  new THREE.Vector3(0, 4, 0),         // 0.00: Sunrise Start (Hero)
  new THREE.Vector3(12, 5, -50),      // 0.15: Gentle curve right into forest entrance
  new THREE.Vector3(-18, 7, -110),    // 0.30: Dense Forest (About)
  new THREE.Vector3(25, 18, -180),    // 0.45: Higher Mountain Pass climb (Services)
  new THREE.Vector3(-10, 12, -260),   // 0.60: Lakeside Highway Descent (Projects)
  new THREE.Vector3(0, 10, -330),     // 0.75: Grand Valley Bridge Crossing (Testimonials)
  new THREE.Vector3(30, 22, -410),    // 0.90: High Cliff Sunset Overlook (Contact / CTA)
  new THREE.Vector3(10, 24, -480),    // 1.00: End Overlook Panorama
];

export const roadCurve = new THREE.CatmullRomCurve3(highwayWaypoints, false, 'centripetal', 0.5);
