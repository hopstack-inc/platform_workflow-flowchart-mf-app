import React, { useState } from "react";
import { conditionTypes } from "../utils/NodeTypeMaps";
import DropDown from "./DropDown";

const AddCondition = ({
  rule,
  updateCondition,
  addCondition,
  deleteCondition,
}) => {
  const [valueToBeCompared, setValueToBeCompared] = useState(
    rule.valueToBeCompared ? rule.valueToBeCompared : "",
  );
  const [condition, setCondition] = useState(
    rule.condition ? rule.condition : "",
  );
  const [comparedValue, setComparedValue] = useState(
    rule.comparedValue ? rule.comparedValue : "",
  );

  return (
    <div className="flex my-2 flex-col gap-2">
      <div className="flex gap-2">
        <DropDown
          values={["", "Group", "Individual"]}
          value={valueToBeCompared}
          setValue={setValueToBeCompared}
        />
        <DropDown
          values={conditionTypes.types}
          value={condition}
          setValue={setCondition}
        />
        <DropDown
          values={["", "Group", "Individual"]}
          value={comparedValue}
          setValue={setComparedValue}
        />
      </div>
      <div className="flex text-white gap-2">
        <div
          onClick={() =>
            updateCondition({
              id: rule.id,
              valueToBeCompared,
              condition: rule,
              comparedValue,
            })
          }
          className="rounded-full px-1 py-1 cursor-pointer border border-blue-400">
          update
        </div>
        <div
          onClick={addCondition}
          className="rounded-full px-1 py-1 cursor-pointer border border-blue-400">
          Add
        </div>
        <div
          onClick={() => deleteCondition(rule.id)}
          className="rounded-full px-1 py-1 cursor-pointer border border-blue-400">
          delete
        </div>
      </div>
    </div>
  );
};

export default AddCondition;
