export type NodeType = "Account" | "Loan" | "Collateral";
export interface TreeNode {
  id: string;
  type: NodeType;
  data: { label: string };
  children: TreeNode[];
}