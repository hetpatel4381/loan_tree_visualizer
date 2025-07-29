import dagre from "dagre";
import type { Edge, Node } from "reactflow";
import type { TreeNode } from "../types/node";

export const getLayoutedElements = (nodes: TreeNode[]) => {
  const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: "TB" });

  const flowNodes: Node[] = [];
  const edges: Edge[] = [];

  const addNodes = (node: TreeNode, parentId?: string) => {
    flowNodes.push({ id: node.id, type: node.type, data: node.data, position: { x: 0, y: 0 } });
    if (parentId) edges.push({ id: `${parentId}-${node.id}`, source: parentId, target: node.id });
    node.children.forEach((child) => addNodes(child, node.id));
  };
  nodes.forEach((node) => addNodes(node));

  flowNodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 150, height: 50 });
  });
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  flowNodes.forEach((node) => {
    const n = dagreGraph.node(node.id);
    node.position = { x: n.x - 75, y: n.y - 25 };
  });

  return { nodes: flowNodes, edges };
};