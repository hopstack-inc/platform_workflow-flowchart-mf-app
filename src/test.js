const testJSON = [
  {
    id: "1",
    type: "initializer",
    stage: "select-customer",
    attributes: {
      optional: true,
    },
    next: ["2"],
  },
  {
    id: "2",
    type: "batch-trigger",
    stage: "scan-consignment",
    target: ["consignment.trackingNumber"],
    next: ["3"],
  },
  {
    id: "3",
    type: "batch-process",
    target: "consignment.products",
    "sub-workflow": [
      {
        id: "4",
        type: "hybrid",
        stage: "identify-item",
        target: ["upc"],
        attributes: {
          manualEntry: true,
        },
        next: ["2"],
      },
    ],
    next: ["4", "482"],
  },
  {
    id: "482",
    next: [],
    type: "batch-triggers",
    stage: "get-picking-batch",
  },
];
export default testJSON;
