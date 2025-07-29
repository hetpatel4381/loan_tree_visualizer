import { Handle, Position } from "reactflow";
import { FaUser } from "react-icons/fa";

const AccountNode = ({ data }: { data: { label: string } }) => (
  <div className="p-2 bg-blue-200 border border-blue-500 rounded shadow">
    <Handle type="target" position={Position.Top} />
    <div className="flex items-center">
      <FaUser className="mr-2" />
      <span>{data.label}</span>
    </div>
    <Handle type="source" position={Position.Bottom} />
  </div>
);
export default AccountNode;