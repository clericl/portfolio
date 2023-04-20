import { useEffect, useRef, ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import {
  MeshBasicMaterial,
  Plane,
  Vector3,
  AlwaysStencilFunc,
  IncrementWrapStencilOp,
  BackSide,
  FrontSide,
  DecrementWrapStencilOp,
  NotEqualStencilFunc,
  ReplaceStencilOp,
  Mesh,
  PlaneGeometry,
  Group,
} from "three";

const forwardVector = new Vector3(0, 0, -1);

function initStencilMaterials() {
  // PASS 1
  // everywhere that the back faces are visible (clipped region) the stencil
  // buffer is incremented by 1.
  const backFaceStencilMat = new MeshBasicMaterial();
  backFaceStencilMat.depthWrite = false;
  backFaceStencilMat.depthTest = false;
  backFaceStencilMat.colorWrite = false;
  backFaceStencilMat.stencilWrite = true;
  backFaceStencilMat.stencilFunc = AlwaysStencilFunc;
  backFaceStencilMat.side = BackSide;
  backFaceStencilMat.stencilFail = IncrementWrapStencilOp;
  backFaceStencilMat.stencilZFail = IncrementWrapStencilOp;
  backFaceStencilMat.stencilZPass = IncrementWrapStencilOp;

  // PASS 2
  // everywhere that the front faces are visible the stencil
  // buffer is decremented back to 0.
  const frontFaceStencilMat = new MeshBasicMaterial();
  frontFaceStencilMat.depthWrite = false;
  frontFaceStencilMat.depthTest = false;
  frontFaceStencilMat.colorWrite = false;
  frontFaceStencilMat.stencilWrite = true;
  frontFaceStencilMat.stencilFunc = AlwaysStencilFunc;
  frontFaceStencilMat.side = FrontSide;
  frontFaceStencilMat.stencilFail = DecrementWrapStencilOp;
  frontFaceStencilMat.stencilZFail = DecrementWrapStencilOp;
  frontFaceStencilMat.stencilZPass = DecrementWrapStencilOp;

  // PASS 3
  // draw the plane everywhere that the stencil buffer != 0, which will
  // only be in the clipped region where back faces are visible.
  const planeStencilMat = new MeshBasicMaterial({
    color: 0x111111
  });
  planeStencilMat.stencilWrite = true;
  planeStencilMat.stencilRef = 0;
  planeStencilMat.stencilFunc = NotEqualStencilFunc;
  planeStencilMat.stencilFail = ReplaceStencilOp;
  planeStencilMat.stencilZFail = ReplaceStencilOp;
  planeStencilMat.stencilZPass = ReplaceStencilOp;

  return [frontFaceStencilMat, backFaceStencilMat, planeStencilMat] as const;
}

function Stencil({ clippingPlane = new Plane(new Vector3(0, 0, 1)), children }: StencilProps) {
  const groupRef = useRef<Group>(null);
  const planeMeshRef = useRef<Mesh>(null!);

  useEffect(() => {
    const [
      frontFaceStencilMat,
      backFaceStencilMat,
      planeStencilMat
    ] = initStencilMaterials();

    frontFaceStencilMat.clippingPlanes = [clippingPlane];
    backFaceStencilMat.clippingPlanes = [clippingPlane];

    const group = groupRef.current!;

    group.traverse((node) => {
      if (!(node instanceof Mesh)) return;
      node.material.clippingPlanes = [clippingPlane];
    });

    const front = group.clone();
    front.traverse((node) => {
      if (!(node instanceof Mesh)) return;
      node.material = frontFaceStencilMat;
    });

    const back = group.clone();
    back.traverse((node) => {
      if (!(node instanceof Mesh)) return;
      node.material = backFaceStencilMat;
    });

    const planeGeom = new PlaneGeometry();
    const planeMesh = new Mesh(planeGeom, planeStencilMat);
    planeMesh.quaternion.setFromUnitVectors(
      forwardVector,
      clippingPlane.normal
    );
    planeMesh.scale.setScalar(100);
    planeMesh.renderOrder = 1;
    planeMeshRef.current = planeMesh;
    planeMesh.position.copy(
      clippingPlane.normal.clone().multiplyScalar(-clippingPlane.constant)
    );

    group.add(front, back, planeMesh);

    return () => {
      group.remove(front, back, planeMesh);
    };
  }, [clippingPlane]);

  useFrame(() => {
    if (planeMeshRef.current) {
      planeMeshRef.current.position.copy(
        clippingPlane.normal.clone().multiplyScalar(-clippingPlane.constant)
      );
    }
  });

  return <group ref={groupRef}>{children}</group>;
};

interface StencilProps {
  children: ReactNode
  clippingPlane?: Plane
}

export default Stencil
