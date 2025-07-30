import React from 'react';
import { NODE_TYPE_CONFIG } from '../../constants/nodeType';

type NodeData = {
  id: string;
  type: string;
  // add other fields if needed
};

type SelectedNode = {
  id: string;
  data: NodeData;
  // add other fields if needed
};

type SidePanelProps = {
  selectedNode: SelectedNode | null,
  onAddChild: (parentId: string, childType: string) => void,
  onDeleteNode: (nodeId: string) => void,
  onClose: () => void
};

const SidePanel: React.FC<SidePanelProps> = ({ selectedNode, onAddChild, onDeleteNode, onClose }) => {
  if (!selectedNode) return null;

  const config = NODE_TYPE_CONFIG[selectedNode.data.type];
  const canAddChildren = config.allowedChildren.length > 0;

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl border-l border-gray-200 z-50">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Node Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Node Info */}
        <div className="mb-6">
          <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${config.color} text-white mb-4`}>
            <span className="text-lg">{config.icon}</span>
            <span className="font-semibold">{config.label}</span>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Node ID</label>
              <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                {selectedNode.data.id}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                {config.label}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                {config.description}
              </div>
            </div>
          </div>
        </div>

        {/* Add Child Section */}
        {canAddChildren && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Add Child Node</h3>
            <div className="space-y-2">
              {config.allowedChildren.map((childType: string) => {
                const childConfig = NODE_TYPE_CONFIG[childType];
                return (
                  <button
                    key={childType}
                    onClick={() => onAddChild(selectedNode.id, childType)}
                    className="w-full flex items-center gap-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg">{childConfig.icon}</span>
                    <div>
                      <div className="font-medium text-gray-900">{childConfig.label}</div>
                      <div className="text-sm text-gray-500">{childConfig.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Delete Section */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Danger Zone</h3>
          <button
            onClick={() => onDeleteNode(selectedNode.id)}
            className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors font-medium"
          >
            Delete Node & All Descendants
          </button>
          <p className="text-xs text-gray-500 mt-2">
            This will permanently delete this node and all its child nodes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
