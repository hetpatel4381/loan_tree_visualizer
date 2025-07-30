export const NODE_TYPES = {
  ACCOUNT: 'account',
  LOAN: 'loan',
  COLLATERAL: 'collateral'
};

export const NODE_TYPE_CONFIG = {
  [NODE_TYPES.ACCOUNT]: {
    label: 'Account',
    allowedChildren: [NODE_TYPES.LOAN, NODE_TYPES.COLLATERAL],
    color: 'bg-blue-500',
    icon: '🏦',
    description: 'Customer account'
  },
  [NODE_TYPES.LOAN]: {
    label: 'Loan',
    allowedChildren: [NODE_TYPES.COLLATERAL],
    color: 'bg-green-500',
    icon: '💰',
    description: 'Loan issued to an account'
  },
  [NODE_TYPES.COLLATERAL]: {
    label: 'Collateral',
    allowedChildren: [],
    color: 'bg-yellow-500',
    icon: '🏠',
    description: 'Asset pledged against a loan'
  }
};

export const ROOT_NODE_TYPES = [NODE_TYPES.ACCOUNT, NODE_TYPES.LOAN];