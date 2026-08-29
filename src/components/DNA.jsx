import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { MODULES } from '../data/modules'

function Tube({ points, color, opacity = 0.56, glow = false, radius = 0.12 }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points])
  return (
    <>
      <mesh>
        <tubeGeometry args={[curve, 96, radius * 1.55, 14, false]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.14}
          metalness={0.04}
          transmission={0.85}
          thickness={0.45}
          transparent
          opacity={opacity}
          side={THREE.DoubleSide}
        />
      </mesh>
      {glow && (
        <mesh>
          <tubeGeometry args={[curve, 96, radius * 0.62, 10, false]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.6} transparent opacity={0.82} />
        </mesh>
      )}
    </>
  )
}

function Rod({ a, b, color, glow }) {
  const direction = useMemo(() => new THREE.Vector3().subVectors(b, a), [a, b])
  const length = direction.length()
  const midpoint = useMemo(() => new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5), [a, b])
  const quaternion = useMemo(() => {
    const q = new THREE.Quaternion()
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize())
    return q
  }, [direction])
  return (
    <>
      <mesh position={midpoint} quaternion={quaternion}>
        <cylinderGeometry args={[0.055, 0.055, length, 12]} />
        <meshPhysicalMaterial color={color} roughness={0.16} transmission={0.65} thickness={0.25} transparent opacity={0.83} />
      </mesh>
      {glow && (
        <mesh position={midpoint} quaternion={quaternion}>
          <cylinderGeometry args={[0.024, 0.024, length, 10]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.2} />
        </mesh>
      )}
    </>
  )
}

function HelixModel({ activeModule, poweredOn, autoRotate, rotationSpeed }) {
  const groupRef = useRef()
  const segments = 84
  const height = 8.8
  const radius = 1.38
  const turns = 4.3
  const strandPointsA = []
  const strandPointsB = []
  const points = []

  for (let i = 0; i < segments; i += 1) {
    const t = i / (segments - 1)
    const y = -height / 2 + t * height
    const angle = t * Math.PI * 2 * turns
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    strandPointsA.push(new THREE.Vector3(x, y, z))
    strandPointsB.push(new THREE.Vector3(-x, y, -z))
    points.push({ t, y, angle })
  }

  useFrame((_, delta) => {
    if (!groupRef.current) return
    if (autoRotate) groupRef.current.rotation.y += delta * rotationSpeed
  })

  const strandChunks = useMemo(() => {
    const chunks = []
    const count = MODULES.length
    for (let moduleIndex = 0; moduleIndex < count; moduleIndex += 1) {
      const start = Math.floor(moduleIndex / count * (segments - 1))
      const end = Math.floor((moduleIndex + 1) / count * (segments - 1))
      chunks.push({
        a: strandPointsA.slice(start, end + 1),
        b: strandPointsB.slice(start, end + 1)
      })
    }
    return chunks
  }, [strandPointsA, strandPointsB])

  return (
    <group ref={groupRef}>
      <group position={[0, 0.05, 0]}>
        {strandChunks.map((chunk, index) => {
          const isActive = activeModule >= 0 && index <= activeModule
          return (
            <group key={MODULES[index].id}>
              <Tube points={chunk.a} color={isActive ? MODULES[index].color : '#8b909b'} opacity={isActive ? 0.7 : 0.18} glow={isActive} radius={0.11} />
              <Tube points={chunk.b} color={isActive ? MODULES[index].color : '#7a7f89'} opacity={isActive ? 0.7 : 0.18} glow={isActive} radius={0.11} />
            </group>
          )
        })}
        {points.map((point, index) => {
          if (index % 3 !== 0) return null
          const moduleIndex = Math.min(6, Math.floor(point.t * 7))
          const a = strandPointsA[index]
          const b = strandPointsB[index]
          const isActive = activeModule >= 0 && moduleIndex <= activeModule
          return <Rod key={`rod-${index}`} a={a} b={b} color={isActive ? MODULES[moduleIndex].color : '#8a8e96'} glow={isActive} />
        })}
      </group>
    </group>
  )
}

function Platform({ color }) {
  return (
    <group position={[0, -4.75, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.18, 2.18, 0.18, 64]} />
        <meshPhysicalMaterial color="#111217" roughness={0.26} metalness={0.65} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <torusGeometry args={[1.72, 0.045, 16, 96]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={5.5} />
      </mesh>
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.62, 0.82, 0.18, 48]} />
        <meshStandardMaterial color="#090a0d" metalness={0.75} roughness={0.25} />
      </mesh>
      <pointLight position={[0, 0.35, 0]} color={color} intensity={4.2} distance={4.5} />
    </group>
  )
}

export function DNA({ activeModule, poweredOn, autoRotate, rotationSpeed, onResetCamera }) {
  const orbitRef = useRef()
  const activeColor = poweredOn && activeModule >= 0 ? MODULES[activeModule].color : '#5ec8ff'

  const reset = () => {
    if (!orbitRef.current) return
    orbitRef.current.reset()
    onResetCamera?.()
  }

  return (
    <div className="dna-canvas-wrap">
      <Canvas camera={{ position: [0, 0.3, 13.3], fov: 35 }} dpr={[1, 1.6]} gl={{ antialias: true, powerPreference: 'high-performance' }}>
        <color attach="background" args={['#050507']} />
        <fog attach="fog" args={['#050507', 9, 21]} />
        <ambientLight intensity={0.48} />
        <directionalLight position={[4, 8, 7]} intensity={2.4} />
        <pointLight position={[-4, 2, 4]} color="#b4d9ff" intensity={3} distance={10} />
        <pointLight position={[3, -3, -2]} color={activeColor} intensity={5} distance={8} />
        <Environment preset="studio" environmentIntensity={0.42} />
        <HelixModel activeModule={activeModule} poweredOn={poweredOn} autoRotate={autoRotate} rotationSpeed={rotationSpeed} />
        <Platform color={activeColor} />
        <ContactShadows position={[0, -4.6, 0]} opacity={0.48} scale={6} blur={2.2} far={6} />
        <OrbitControls ref={orbitRef} enableDamping dampingFactor={0.06} minDistance={8.2} maxDistance={18} target={[0, -0.1, 0]} />
      </Canvas>
      <button className="camera-reset" type="button" onClick={reset} title="Resetar câmera">
        ↺
      </button>
      <div className="dna-hint">arraste para girar · roda/pinça para zoom</div>
    </div>
  )
}
