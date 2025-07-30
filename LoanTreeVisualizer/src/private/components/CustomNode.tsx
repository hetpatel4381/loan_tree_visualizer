import { Handle, Position } from 'reactflow';
import { NODE_TYPE_CONFIG } from '../../constants/nodeType';

interface CustomNodeData {
  id: string;
  type: keyof typeof NODE_TYPE_CONFIG;
}

const CustomNode = ({ data, selected }: { data: CustomNodeData, selected: boolean }) => {
  const config = NODE_TYPE_CONFIG[data.type];
  
  return (
    <div className={`relative ${selected ? 'ring-2 ring-blue-400' : ''}`}>
      {/* Input handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-gray-400 border-2 border-white"
      />
      
      {/* Node content */}
      <div className={`
        min-w-[120px] px-4 py-3 rounded-lg shadow-md border-2 border-white
        ${config.color} text-white font-medium
        transition-all duration-200 hover:scale-105
      `}>
        <div className="flex items-center gap-2">
          <span className="text-lg">{config.icon}</span>
          <div>
            <div className="font-semibold text-sm">{config.label}</div>
            <div className="text-xs opacity-90">ID: {data.id.slice(0, 8)}</div>
          </div>
        </div>
      </div>
      
      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-gray-400 border-2 border-white"
      />
    </div>
  );
};

export default CustomNode;
