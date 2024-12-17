import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { getNodes, getNodeDetails } from "../api/api";

interface Node {
  id: number;
  name: string;
  type: string;
  position: [number, number, number];
}

const Graph: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  useEffect(() => {
    const fetchNodes = async () => {
      const data = await getNodes();
      const distributedNodes = data.map((node: any, index: number) => ({
        ...node,
        position: [
          Math.cos(index) * 10,
          Math.sin(index) * 10,
          Math.random() * 10,
        ],
      }));
      setNodes(distributedNodes);
    };

    fetchNodes();
  }, []);

  const handleClick = async (id: number) => {
    const details = await getNodeDetails(id);
    setSelectedNode(details);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        {nodes.map((node) => (
          <mesh
            key={node.id}
            position={node.position}
            onClick={() => handleClick(node.id)}
          >
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color={node.type === "user" ? "blue" : "red"} />
          </mesh>
        ))}
        {selectedNode && (
          <div style={{ position: "absolute", top: 10, left: 10 }}>
            <h3>Выбранный узел:</h3>
            <p>Имя: {selectedNode.name}</p>
            <p>ID: {selectedNode.id}</p>
          </div>
        )}
      </Canvas>
    </div>
  );
};

export default Graph;
