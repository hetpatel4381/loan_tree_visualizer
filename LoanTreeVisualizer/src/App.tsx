import React, { useState, useCallback, useMemo } from 'react';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
} from 'reactflow';
import type { Node, Edge, Connection } from 'reactflow';
import dagre from 'dagre';
import { nanoid } from 'nanoid';
import 'reactflow/dist/style.css';
import CustomNode from './private/components/CustomNode';
import ToolBar from './private/components/ToolBar';
import JsonExport from './private/components/JsonExport';
import SidePanel from './private/components/SIdePanel';

const nodeTypes = {
  custom: CustomNode,
};

const nodeWidth = 150;
const nodeHeight = 80;

const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction: 'TB' | 'LR' = 'TB'
) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };
    return node;
  });

  return { nodes: layoutedNodes, edges };
};

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            id: `e${params.source}-${params.target}`,
            type: 'smoothstep',
          },
          eds
        )
      );
    },
    [setEdges]
  );

  const createNode = useCallback(
    (type: string, parentId: string | null = null) => {
      const newNode: Node = {
        id: nanoid(),
        type: 'custom',
        data: {
          id: nanoid(),
          type: type,
        },
        position: { x: 0, y: 0 },
      };

      setNodes((nds) => [...nds, newNode]);

      if (parentId) {
        const newEdge: Edge = {
          id: `e${parentId}-${newNode.id}`,
          source: parentId,
          target: newNode.id,
          type: 'smoothstep',
        };
        setEdges((eds) => [...eds, newEdge]);
      }

      return newNode;
    },
    [setNodes, setEdges]
  );

  const addRootNode = useCallback(
    (type: string) => {
      const newNode = createNode(type);

      setTimeout(() => {
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
          nodes.concat([newNode]),
          edges
        );
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
      }, 100);
    },
    [createNode, nodes, edges, setNodes, setEdges]
  );

  const addChildNode = useCallback(
    (parentId: string, childType: string) => {
      const newNode = createNode(childType, parentId);

      setTimeout(() => {
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
          nodes.concat([newNode]),
          edges.concat([
            {
              id: `e${parentId}-${newNode.id}`,
              source: parentId,
              target: newNode.id,
              type: 'smoothstep',
            },
          ])
        );
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
      }, 100);
    },
    [createNode, nodes, edges, setNodes, setEdges]
  );

  const deleteNode = useCallback(
    (nodeId: string) => {
      const getDescendants = (id: string): string[] => {
        const descendants: string[] = [];
        const queue: string[] = [id];

        while (queue.length > 0) {
          const currentId = queue.shift()!;
          const childEdges = edges.filter((edge) => edge.source === currentId);

          childEdges.forEach((edge) => {
            descendants.push(edge.target);
            queue.push(edge.target);
          });
        }

        return descendants;
      };

      const descendants = getDescendants(nodeId);
      const nodesToDelete = [nodeId, ...descendants];

      setNodes((nds) => nds.filter((node) => !nodesToDelete.includes(node.id)));
      setEdges((eds) =>
        eds.filter(
          (edge) =>
            !nodesToDelete.includes(edge.source) &&
            !nodesToDelete.includes(edge.target)
        )
      );

      if (selectedNode && nodesToDelete.includes(selectedNode.id)) {
        setSelectedNode(null);
      }
    },
    [edges, setNodes, setEdges, selectedNode]
  );

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const layoutedElements = useMemo(() => {
    if (nodes.length === 0) return { nodes: [], edges: [] };
    return getLayoutedElements(nodes, edges);
  }, [nodes, edges]);

  return (
    <div className="h-screen w-screen">
      <ReactFlow
        nodes={layoutedElements.nodes}
        edges={layoutedElements.edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
      >
        <Controls />
        <Background color="#aaa" gap={16} />
        <MiniMap nodeStrokeWidth={3} zoomable pannable />
      </ReactFlow>

      <ToolBar onAddRootNode={addRootNode} />
      <JsonExport
        nodes={nodes.map((node: Node) => ({
          id: node.id,
          position: node.position,
          data: {
            id: node.data.id,
            type: node.data.type
          }
        }))}
        edges={edges.map((edge: Edge) => ({
          id: edge.id,
          source: edge.source,
          target: edge.target
        }))}
      />

      <SidePanel
        selectedNode={selectedNode}
        onAddChild={addChildNode}
        onDeleteNode={deleteNode}
        onClose={() => setSelectedNode(null)}
      />
    </div>
  );
}

export default App;
