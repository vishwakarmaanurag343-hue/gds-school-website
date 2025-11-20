import * as THREE from "three";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import { SVGLoader, MeshSurfaceSampler } from "three-stdlib";
import {
  EffectComposer,
  Bloom,
  Vignette,
  Noise,
} from "@react-three/postprocessing";
import { createNoise3D } from "simplex-noise";

const rfs = THREE.MathUtils.randFloatSpread;
const noise = createNoise3D(Math.random);

const PARTICLE_COUNT = 6000;
const SVG_URL = "/gds-logo.svg"; // Updated to match navbar logo

export const Hero3D = () => {
  const sunRef = useRef<THREE.PointLight>(null);

  const [particleColor, setParticleColor] = useState(new THREE.Color("#1e3a8a")); // Dark Blue
  const [sunPosition, setSunPosition] = useState(new THREE.Vector3(100, 20, 100));

  function SunAndSkyController({ sunRef, onSunPositionChange }: any) {
    const { camera } = useThree();

    useFrame((state) => {
      if (!sunRef.current) return;
      const t = state.clock.getElapsedTime();
      sunRef.current.intensity = THREE.MathUtils.lerp(0, 1.0, Math.min(t / 0.5, 1));

      const sunPos = new THREE.Vector3();
      sunPos.set(
        camera.position.x + 10,
        Math.sin(t * 0.1) * 10 + 10,
        camera.position.z + 10
      );
      sunRef.current.position.copy(sunPos);
      onSunPositionChange(sunPos);
    });
    return null;
  }

  // Static Camera
  function StaticCamera() {
    const { camera } = useThree();
    useEffect(() => {
      camera.position.set(0, 5, 22);
      camera.lookAt(0, 0.5, 0);
    }, [camera]);
    return null;
  }

  return (
    <div className="w-full h-[400px] md:h-[500px] bg-transparent">
      <Canvas camera={{ position: [0, 5, 22], fov: 60 }} gl={{ alpha: true }}>
        {/* Transparent background */}

        <ambientLight intensity={0.1} />
        <pointLight ref={sunRef} position={[100, 20, 100]} intensity={0} />

        {/* Particle system */}
        <Suspense fallback={null}>
          <ParticleSystem particleColor={particleColor} sunPosition={sunPosition} />
        </Suspense>

        <StaticCamera />
        <SunAndSkyController
          sunRef={sunRef}
          onSunPositionChange={setSunPosition}
        />

        <EffectComposer multisampling={4}>
          <Bloom intensity={50} kernelSize={3} luminanceThreshold={0} luminanceSmoothing={0.5} />
          <Noise opacity={0.5} />
          <Vignette eskil={false} offset={0.1} darkness={0.9} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

function ParticleSystem({ particleColor, sunPosition }: any) {
  const svgData = useLoader(SVGLoader, SVG_URL);
  console.log("Hero3D SVG Data:", svgData);
  const targetPositions = useMemo(() => {
    if (!svgData) return [];
    const shapes: THREE.Shape[] = [];
    svgData.paths.forEach((path) => {
      shapes.push(...SVGLoader.createShapes(path));
    });
    if (shapes.length === 0) return [];
    const geometry = new THREE.ExtrudeGeometry(shapes, {
      depth: 2,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.2,
      bevelOffset: 0,
      bevelSegments: 2,
    });
    geometry.computeBoundingBox();
    const box = geometry.boundingBox!;
    const size = new THREE.Vector3();
    box.getSize(size);
    const scale = 22 / Math.max(size.x, size.y);
    geometry.scale(scale, -scale, scale);
    geometry.center();
    const mesh = new THREE.Mesh(geometry);
    const sampler = new MeshSurfaceSampler(mesh).build();
    const particles = [];
    const tempPosition = new THREE.Vector3();
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      sampler.sample(tempPosition);
      particles.push(tempPosition.clone());
    }
    return particles;
  }, [svgData]);

  if (targetPositions.length === 0) return null;
  return <Particles target={targetPositions} color={particleColor} />;
}

function Particles({ target, color }: any) {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef(new THREE.Vector3(0, 0, 0));

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, () => ({
        position: new THREE.Vector3().randomDirection().multiplyScalar(rfs(20)),
        velocity: new THREE.Vector3(0, 0, 0),
      })),
    []
  );

  const particlePositions = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), []);
  const tempVecs = useMemo(
    () => ({
      targetForce: new THREE.Vector3(),
      mouseForce: new THREE.Vector3(),
      wanderForce: new THREE.Vector3(),
    }),
    []
  );

  useFrame((state) => {
    if (!pointsRef.current) return;
    mouseRef.current.set(
      (state.mouse.x * state.viewport.width) / 2,
      (state.mouse.y * state.viewport.height) / 2,
      0
    );

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const particle = particles[i];
      const targetPos = target[i];
      const { targetForce, mouseForce, wanderForce } = tempVecs;

      targetForce.subVectors(targetPos, particle.position).multiplyScalar(0.01);

      mouseForce.set(0, 0, 0);
      const distToMouse = particle.position.distanceTo(mouseRef.current);
      if (distToMouse < 1.2) {
        const strength = (1.2 - distToMouse) * 0.15;
        mouseForce
          .subVectors(particle.position, mouseRef.current)
          .normalize()
          .multiplyScalar(strength);
      }

      const t = state.clock.elapsedTime;
      wanderForce
        .set(
          noise(i, t * 0.2, 1) * 0.5 - 0.25,
          noise(i, t * 0.2, 2) * 0.5 - 0.25,
          noise(i, t * 0.2, 3) * 0.5 - 0.25
        )
        .multiplyScalar(0.005);

      particle.velocity
        .add(targetForce)
        .add(mouseForce)
        .add(wanderForce)
        .multiplyScalar(0.92);
      particle.position.add(particle.velocity);
      particle.position.toArray(particlePositions, i * 3);
    }

    // Safe array update for Three.js BufferAttribute
    const positionAttribute = pointsRef.current.geometry.attributes.position;
    if (positionAttribute) {
      (positionAttribute.array as Float32Array).set(particlePositions);
      positionAttribute.needsUpdate = true;
    }
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={particlePositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color={color}
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
          toneMapped={false}
        />
      </points>
    </>
  );
}