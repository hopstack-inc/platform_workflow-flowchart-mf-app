export const selections = {
  types: ["initializer", "batch-triggers", "batch-process"],
  initializer: ["", "select customer"],
  "batch-triggers": ["", "scan-consignment", "get-picking-batch"],
  "batch-process": ["", "process-loop", "identify-item"],
};

export const targets = {
  "scan-consignment": ["", "consignment.trackingNumber", "consignment.id"],
  "batch-process": ["", "consignments.products"],
  "identify-item": ["", "upc", "ean", "sku"],
};

export const allowedTypes = {
  "identify-item": ["", "scan", "pick-item", "hybrid"],
};
export const attributeTypes = [
  { attribute: "optional", value: true },
  { attribute: "manualEntry", value: false },
];

export const nodeType = {
  types: [" ", "core", "ancillary"],
};

export const systemProvidedInfo = {
  types: [
    "",
    "inbound",
    "client",
    "product-information",
    "bundle-information",
    "inventory",
    "warehouse",
    "oubound",
  ],
  inbound: [
    "tracking-number",
    "consignment-number",
    "order-id",
    "fullfilment-type",
    "carrier",
    "consignment-date",
    "quantity-expected-in-consignment",
  ],
  client: ["client-name"],
  "product-information": [
    "sku",
    "seller-sku/msku",
    "asin",
    "product-image",
    "name",
    "quantity",
    "upc",
    "ean",
    "fnsku",
    "supplier-name",
    "lpn",
  ],
  "bundle-information": ["bundle-name", "bundle-asin"],
  inventory: ["unallocated-quantity-for-sku", "damaged-quantity-for-sku"],
  warehouse: ["name", "address", "code"],
  outbound: [
    "orderID",
    "carrier",
    "status",
    "order-date",
    "order-value",
    "tracking-number",
    "shipping-address-name",
  ],
};

export const userActionTypes = { types: ["", "scan", "type", "dropDown"] };

export const userActionsAndValidations = {
  scan: ["", "consignment-number", "trackingNumber", "sku", "tote", "bin"],
  type: [
    "",
    "consignment-number",
    "trackingNumber",
    "sku",
    "tote",
    "bin",
    "quantity-of-goods",
    "notes",
  ],
  dropDown: ["", "form-factors"],
};

export const sysActions = {
  types: ["", "workflow", "printouts", "notifications", "inventory", "system"],
  workflow: ["", "repeat-workflow", "terminate-workflow"],
  printouts: [
    "",
    "Bill of Lading",
    "lpn",
    "ean",
    "upc",
    "asin",
    "bin-location",
    "outbound-tracking-number",
    "seller-sku",
  ],
  notifications: [
    "",
    "email-notification",
    "toast-notification",
    "platform-notification",
  ],
  inventory: ["", "add-items", "remove-items"],
  system: ["", "logout-user"],
};

export const ancillaryTypes = {
  types: [
    " ",
    "Conditional triggers",
    "Printouts",
    "Notifications",
    "Timers",
    "Approval Loop",
    "Iteration Counter",
  ],
};
export const conditionTypes = {
  types: [
    "Equal to",
    "Greater than",
    "Less than",
    "Greater than equal to",
    "Less than equal to",
    "Not equal to",
  ],
};
