import React, { useState } from "react";
import { Button } from "./Button";
import ToggleComponent from "./ToggleComponent";

const NewNode = ({ addNode, setShowModal }) => {
  const selections = {
    types: ["initializer", "batch-triggers", "batch-process"],
    initializer: ["select customer"],
    "batch-triggers": ["scan-consignment", "get-picking-batch"],
    "batch-process": ["process-loop", "identify-item"],
  };

  const targets = {
    "scan-consignment": ["consignment.trackingNumber", "consignment.id"],
    "batch-process": ["consignments.products"],
    "identify-item": ["upc", "ean", "sku"],
  };

  const allowedTypes = { "identify-item": ["scan", "pick-item", "hybrid"] };
  const attributes = [
    { attribute: "optional", value: false },
    { attribute: " manualEntry", value: false },
  ];

  const [type, setType] = useState(null);
  const [stage, setStage] = useState(null);
  const [target, setTarget] = useState(null);
  const [allowedType, setAllowedType] = useState(null);
  //   const [attributes, setAttributes] = useState(mapToList(data.attributes));

  return (
    <div className="p-4 flex flex-col gap-3 bg-white rounded-sm border border-black">
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
      {(targets[type] || targets[stage]) && (
        <label className="flex text-sm">
          Target?
          <select onChange={(e) => setTarget(e.target.value)}>
            {(targets[type] || targets[stage]).map((target) => (
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
            <label key={attribute.attribute} className="flex text-sm">
              {attribute.attribute}?
              <div className="h-10">
                <ToggleComponent
                  key={attribute.attribute}
                  enabled={attribute.value}
                  setEnabled={() => (attribute.value = !attribute.value)}
                />
              </div>
            </label>
          );
        })}
      {type && stage && (
        <Button
          title={"Add Node"}
          onClick={() => {
            addNode({ type: type, stage: stage, target, allowedType });
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default NewNode;
