import ReactFlow, { Background } from "reactflow";
import { useTreeStore } from "../store/treeStore";
import AccountNode from "./Node/AccountNode";
import LoanNode from "./Node/LoanNode";
import CollateralNode from "./Node/CollateralNode";
import { getLayoutedElements } from "../utils/layout";

const nodeTypes = { Account: AccountNode, Loan: LoanNode, Collateral: CollateralNode };

const TreeVisualizer = () => {
  const { nodes, setSelectedNode } = useTreeStore();
  const { nodes: layoutedNodes, edges } = getLayoutedElements(nodes);

  return (
    <div className="h-screen w-full">
      <ReactFlow
        nodes={layoutedNodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={(_, node) => setSelectedNode(nodes.find((n) => n.id === node.id) || null)}
        fitView
        nodesDraggable={false}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};
export default TreeVisualizer;