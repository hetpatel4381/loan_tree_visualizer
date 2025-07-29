import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import type { NodeType, TreeNode } from "../types/node";

interface TreeState {
  nodes: TreeNode[];
  selectedNode: TreeNode | null;
  addNode: (parentId: string | null, type: NodeType) => void;
  deleteNode: (id: string) => void;
  setSelectedNode: (node: TreeNode | null) => void;
}

export const useTreeStore = create<TreeState>((set) => ({
  nodes: [],
  selectedNode: null,
  addNode: (parentId, type) =>
    set((state) => {
      const newNode: TreeNode = { id: uuidv4(), type, data: { label: type }, children: [] };
      if (!parentId) return { nodes: [...state.nodes, newNode] };
      const addChild = (nodes: TreeNode[]): TreeNode[] =>
        nodes.map((node) =>
          node.id === parentId ? { ...node, children: [...node.children, newNode] } : { ...node, children: addChild(node.children) }
        );
      return { nodes: addChild(state.nodes) };
    }),
  deleteNode: (id) =>
    set((state) => {
      const removeNode = (nodes: TreeNode[]): TreeNode[] =>
        nodes.filter((node) => node.id !== id).map((node) => ({ ...node, children: removeNode(node.children) }));
      return { nodes: removeNode(state.nodes) };
    }),
  setSelectedNode: (node) => set({ selectedNode: node }),
}));