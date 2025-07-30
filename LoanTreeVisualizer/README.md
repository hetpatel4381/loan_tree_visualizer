# LoanTreeVisualizer

A tree visualizer for a loan management system built with React, TypeScript, and React Flow.

## Data Model
- Nodes: `Account`, `Loan`, `Collateral`
- Structure: Hierarchical tree with allowed children (Account -> Loan/Collateral, Loan -> Collateral)

## Node Rendering
- Custom components with Tailwind CSS and react-icons for distinct styling.

## UX Decisions
- Side panel for node details, adding/deleting nodes.
- Auto-layout with Dagre for seamless updates.
- JSON export for bonus functionality.

## Limitations
- No drag-and-drop as per requirements.
- Basic styling; could be enhanced with more time.

## Setup
1. `npm install`
2. `npm run dev`

## Deployed Link
[Insert link here]