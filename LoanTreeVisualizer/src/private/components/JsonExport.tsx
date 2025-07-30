import { useState } from "react";

type NodeType = {
  id: string;
  position: { x: number; y: number };
  data: { id: string; type: string };
};

type EdgeType = {
  id: string;
  source: string;
  target: string;
};

const JsonExport = ({ nodes, edges }: { nodes: NodeType[]; edges: EdgeType[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [exportData, setExportData] = useState('');

  const handleExport = () => {
    const treeData = {
      nodes: nodes.map((node: NodeType) => ({
        id: node.id,
        type: node.data.type,
        position: node.position,
        data: {
          id: node.data.id,
          type: node.data.type
        }
      })),
      edges: edges.map((edge: EdgeType) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target
      })),
      timestamp: new Date().toISOString()
    };

    setExportData(JSON.stringify(treeData, null, 2));
    setIsOpen(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(exportData);
  };

  const handleDownload = () => {
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `loan-tree-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <button
        onClick={handleExport}
        className="fixed top-4 right-4 z-40 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
      >
        Export JSON
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">Tree Structure Export</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 p-6 overflow-auto">
              <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-auto max-h-96">
                {exportData}
              </pre>
            </div>
            
            <div className="flex gap-3 p-6 border-t">
              <button
                onClick={handleCopy}
                className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors font-medium"
              >
                Copy to Clipboard
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                Download JSON
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JsonExport;
