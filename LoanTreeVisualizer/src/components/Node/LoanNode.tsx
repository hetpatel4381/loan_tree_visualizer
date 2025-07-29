import { Handle, Position } from "reactflow";
import { FaMoneyBill } from "react-icons/fa";

const LoanNode = ({ data }: { data: { label: string } }) => (
  <div className="p-2 bg-green-200 border border-green-500 rounded shadow">
    <Handle type="target" position={Position.Top} />
    <div className="flex items-center">
      <FaMoneyBill className="mr-2" />
      <span>{data.label}</span>
    </div>
    <Handle type="source" position={Position.Bottom} />
  </div>
);
export default LoanNode;