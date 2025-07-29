import { useTreeStore } from "../store/treeStore";

const SidePanel = () => {
  const { selectedNode, addNode, deleteNode, setSelectedNode } = useTreeStore();
  if (!selectedNode) return <div className="w-64 p-4 bg-gray-100">Select a node</div>;

  const validChildren = selectedNode.type === "Account" ? ["Loan", "Collateral"] : selectedNode.type === "Loan" ? ["Collateral"] : [];

  return (
    <div className="w-64 p-4 bg-gray-100 border-l">
      <h2 className="text-lg font-bold">Node Details</h2>
      <p>Type: {selectedNode.type}</p>
      <p>ID: {selectedNode.id}</p>
      {validChildren.length > 0 && (
        <div>
          <h3 className="mt-2">Add Child:</h3>
          {validChildren.map((type) => (
            <button
              key={type}
              className="m-1 p-2 bg-blue-500 text-white rounded"
              onClick={() => addNode(selectedNode.id, type as "Account" | "Loan" | "Collateral")}
            >
              {type}
            </button>
          ))}
        </div>
      )}
      <button className="mt-4 p-2 bg-red-500 text-white rounded" onClick={() => { deleteNode(selectedNode.id); setSelectedNode(null); }}>
        Delete Node
      </button>
    </div>
  );
};
export default SidePanel;