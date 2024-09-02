"use client";
import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {  OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import { MeshStandardMaterial } from "three";


// Utility function to modify the image URL
const modifyUrl = (url: string): string => {
  const fill = "c_fill,c_crop,h_100,w_100";
  const urlList = url.split("upload/");
  return `${urlList[0]}upload/${fill}/${urlList[1]}`;
};

// Generic Rotating Model Component
const RotatingModel = ({
  modelPath,
  img,
}: {
  modelPath: string;
  img: string;
}) => {
  const gltf = useGLTF(modelPath, "/draco/");
  const texture = useTexture(modifyUrl(img));
  // const [isLoading, setIsLoading] = useState(true);
  const y = modelPath === "/polo.glb" ? -0.28 : modelPath === "/boxer.glb" ? 0.35 : -0.22;

  useEffect(() => {
    gltf.scene.traverse((child: any) => {
      if (child.isMesh) {
        child.material = new MeshStandardMaterial({ map: texture });
      }
    });
    // setIsLoading(false);
  }, [gltf, texture]);

  return (
    <group
      rotation={[Math.PI, Math.PI, Math.PI]}
      scale={0.01}
      position={[0, y, 0]}
    >
      <primitive object={gltf.scene} />
    </group>
  );
};

// Main VHS component with conditional rendering
const VHS: React.FC<{ img: string; cate: string }> = ({ img, cate }) => {
  let modelPath = "";
  let fov = 63

  switch (cate) {
    case "shirt":
      modelPath = "/multiple/DG100074-transformed.glb";
      break;
    case "polo":
      modelPath = "/polo.glb";
      break;
    // case "shorts":
    //   modelPath = "/boxer.glb"; 
    //   fov = 35
      break;
    default:
      return null;
  }

  return (
    <Canvas camera={{ position: [0, 0.4, 0.5], fov: fov }}>
      <ambientLight intensity={1} />
      <directionalLight position={[0, 2, 5]} intensity={0.5} />
      <directionalLight position={[5, 2, 0]} intensity={1} />
      <directionalLight position={[-5, 2, 0]} intensity={0.3} />
      <spotLight
        position={[0, 5, 5]}
        angle={0.3}
        penumbra={0.5}
        intensity={0.2}
        castShadow
      />
      <pointLight position={[0, 2, 3]} intensity={1} />
      <RotatingModel modelPath={modelPath} img={img} />
      <OrbitControls
        autoRotate
        enableRotate
        enableZoom={false}
        target={[0, 1, 0]}
        minDistance={0.5}
        maxDistance={2}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
};

export default VHS;

useGLTF.preload("/multiple/DG100074-transformed.glb");
// useGLTF.preload("/boxer.glb");
useGLTF.preload("/polo.glb");
