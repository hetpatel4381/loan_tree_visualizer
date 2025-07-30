# LoanTreeVisualizer

**Live Demo:** [https://loan-tree-visualizer-kappa.vercel.app/](https://loan-tree-visualizer-kappa.vercel.app/)

A modern, responsive tree visualizer for loan management systems.  
Built with React, TypeScript, Zustand, React Flow, Dagre, and Tailwind CSS.

---

## 🚀 Features

- **Hierarchical Tree Visualization:**  
  Visualize relationships between Accounts, Loans, and Collaterals.
- **Custom Node Components:**  
  All nodes use custom React components from `src/private/components` for distinct visuals.
- **Auto Layout:**  
  Tree layout is automatically managed using Dagre—no drag-and-drop.
- **Side Panel:**  
  Click any node to view details, add valid children, or delete node (with descendants).
- **Toolbar:**  
  Add root nodes (Account or Loan) easily.
- **JSON Export:**  
  Export the current tree structure as JSON, copy to clipboard, or download.
- **Responsive UI:**  
  Fully styled with Tailwind CSS for a clean, modern look.

---

## 📁 Folder Structure

```
src/
  private/
    components/
      CustomNode.tsx      # Renders all node types (Account, Loan, Collateral)
      ToolBar.tsx         # Add root nodes
      SidePanel.tsx       # Node details, add/delete child
      JsonExport.tsx      # Export tree as JSON
  App.tsx                 # Main app logic
  ...
```

---

## 🌳 Data Model

### Node Types

| Type       | Description                | Allowed Children   |
|------------|---------------------------|--------------------|
| Account    | Customer’s account        | Loan, Collateral   |
| Loan       | Loan issued to account    | Collateral         |
| Collateral | Asset pledged for a loan  | None               |

- Only Account and Loan can be root nodes.

### Example Node Shape

```ts
{
  id: "node-uuid",
  position: { x: 0, y: 0 },
  data: {
    id: "node-uuid",
    type: "Account" | "Loan" | "Collateral"
  }
}
```

### Example Edge Shape

```ts
{
  id: "edge-uuid",
  source: "parent-node-id",
  target: "child-node-id"
}
```

---

## 🧩 Components

- **CustomNode:**  
  Renders nodes with icons and colors based on type.
- **ToolBar:**  
  Add Account or Loan root nodes.
- **SidePanel:**  
  Shows node details, allows adding valid children, and deleting nodes.
- **JsonExport:**  
  Export/copy/download the current tree as JSON.

---

## 💡 UX Decisions

- **No Drag-and-Drop:**  
  Layout is always auto-managed for clarity.
- **Side Panel:**  
  Appears on node click, showing details and actions.
- **Toolbar:**  
  Always accessible for adding root nodes.
- **Modern UI:**  
  Tailwind CSS for spacing, colors, responsiveness, and accessibility.

---

## ⚡ Getting Started

1. **Install dependencies:**
   ```
   npm install
   ```
2. **Run locally:**
   ```
   npm run dev
   ```
3. **Build for production:**
   ```
   npm run build
   ```

---

## 📝 Limitations & Trade-offs

- No backend integration.
- No drag-and-drop; layout is always automatic.
- Only Account and Loan can be root nodes.
- Deleting a node removes all its descendants.

---

## 📦 Export

- Use the JSON Export button to copy or download the current tree structure.

---

## 🛠 Tech Stack

- React + TypeScript
- Zustand (state management)
- React Flow + Dagre (visualization & layout)
- Tailwind CSS (styling)
- uuid/nanoid (unique IDs)

---