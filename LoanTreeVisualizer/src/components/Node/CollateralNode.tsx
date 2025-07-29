import { Handle, Position } from "reactflow";
import { FaShieldAlt } from "react-icons/fa";

const CollateralNode = ({ data }: { data: { label: string } }) => (
  <div className="p-2 bg-yellow-200 border border-yellow-500 rounded shadow">
    <Handle type="target" position={Position.Top} />
    <div className="flex items-center">
      <FaShieldAlt className="mr-2" />
      <span>{data.label}</span>
    </div>
  </div>
);
export default CollateralNode;