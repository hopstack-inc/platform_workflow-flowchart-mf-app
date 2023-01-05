import React, { useEffect, useState } from "react";
import { Button } from "./Button";

const NewNode = ({ addNode, data = null, setShowModal }) => {
  const selections = {
    types: ["initializer", "batch-triggers", "batch-process"],
    initializer: ["", "select customer"],
    "batch-triggers": ["", "scan-consignment", "get-picking-batch"],
    "batch-process": ["", "process-loop", "identify-item"],
  };

  const targets = {
    "scan-consignment": ["", "consignment.trackingNumber", "consignment.id"],
    "batch-process": ["", "consignments.products"],
    "identify-item": ["", "upc", "ean", "sku"],
  };

  const allowedTypes = { "identify-item": ["", "scan", "pick-item", "hybrid"] };
  const attributeTypes = [
    { attribute: "optional", value: true },
    { attribute: "manualEntry", value: false },
  ];

  const [type, setType] = useState(
    !data?.type ? selections.types[0] : data.type,
  );
  const [stage, setStage] = useState(!data?.stage ? null : data.stage);
  const [target, setTarget] = useState(!data?.target ? null : data.target);
  const [allowedType, setAllowedType] = useState(
    !data?.allowedType ? null : data.allowedType,
  );
  const [attributes, setAttributes] = useState(attributeTypes);

  function updateAttribute(attribute) {
    let newState = [
      ...attributes.map((attr) =>
        attr.attribute == attribute.attribute
          ? { attribute: attr.attribute, value: !attr.value }
          : attr,
      ),
    ];
    setAttributes([...newState]);
  }

  function getAttributes() {
    let att = {};
    attributes.forEach((attr) => {
      att[attr["attribute"]] = attr.value;
    });
    return att;
  }

  return (
    <div className="p-4 flex flex-col gap-3 bg-white rounded-sm border border-black">
      Add New Node
      <label className="flex text-sm">
        Type?
        <select onChange={(e) => setType(e.target.value)}>
          {selections.types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      {type && (
        <label className="flex text-sm">
          Stage?
          <select onChange={(e) => setStage(e.target.value)}>
            {selections[type].map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </label>
      )}
      {stage && allowedTypes[stage] && (
        <label className="flex text-sm">
          Allowed Type?
          <select onChange={(e) => setAllowedType(e.target.value)}>
            {allowedTypes[stage].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      )}
      {(targets[stage] || targets[type] ) && (
        <label className="flex text-sm">
          Target?
          <select onChange={(e) => setTarget(e.target.value)}>
            {(targets[stage] || targets[type] ).map((target) => (
              <option key={target} value={target}>
                {target}
              </option>
            ))}
          </select>
        </label>
      )}
      {stage &&
        attributes.map((attribute) => {
          return (
            <label key={attribute.attribute} className="flex gap-2 text-sm">
              <input
                type={"checkbox"}
                checked={attribute.value}
                onChange={(e) => updateAttribute(attribute)}
              />
              {attribute.attribute}?
            </label>
          );
        })}
      {type && (
        <Button
          title={"Add Node"}
          onClick={() => {
            setShowModal(false);
            addNode({
              type,
              stage,
              target,
              allowedType,
              attributes: getAttributes(),
            });
          }}
        />
      )}
    </div>
  );
};

export default NewNode;
