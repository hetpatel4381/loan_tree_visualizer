import { NODE_TYPE_CONFIG, ROOT_NODE_TYPES } from '../../constants/nodeType';

const ToolBar = ({ onAddRootNode }: { onAddRootNode: (type: string) => void }) => {
  return (
    <div className="fixed top-4 left-4 z-40">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Add Root Node</h3>
        <div className="space-y-2">
          {ROOT_NODE_TYPES.map((nodeType) => {
            const config = NODE_TYPE_CONFIG[nodeType];
            return (
              <button
                key={nodeType}
                onClick={() => onAddRootNode(nodeType)}
                className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-50 transition-colors w-full"
              >
                <span className="text-base">{config.icon}</span>
                <span className="font-medium text-gray-700">{config.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ToolBar;
