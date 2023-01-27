import { rule } from "postcss";
import React, { useState } from "react";
import AddAction from "./AddActions";
import AddCondition from "./AddCondtion";
import DropDown from "./DropDown";

const ConditionalTrigger = () => {
  const [conditionTitle, setConditionTitle] = useState("");
  const [requiredCondition, setRequiredCondition] = useState("");
  const [conditions, setConditions] = useState([
    { id: 0, valueToBeCompared: "", condition: "", comparedValue: "" },
  ]);
  const [actions, setActions] = useState([
    { id: 0, action: "", actionValue: "" },
  ]);

  function updateCondition(rule) {
    let conditionToBeUpdated = conditions.find(
      (condition) => condition.id === rule.id,
    );
    conditionToBeUpdated.valueToBeCompared = rule.valueToBeCompared;
    conditionToBeUpdated.condition = rule.condition;
    conditionToBeUpdated.comparedValue = rule.comparedValue;

    setConditions([...conditions]);
  }

  function addCondition() {
    setConditions([
      ...conditions,
      {
        id: conditions.at(-1).id + 1,
        valueToBeCompared: "",
        condition: "",
        comparedValue: "",
      },
    ]);
  }
  function deleteCondition(id) {
    setConditions([...conditions.filter((condition) => condition.id !== id)]);
  }

  function updateAction(action) {
    let toBeUpdated = actions.find((condition) => condition.id === action.id);
    toBeUpdated.action = action.action;
    toBeUpdated.actionValue = action.actionValue;
    setConditions([...conditions]);
  }

  function addAction() {
    setActions([
      ...actions,
      {
        id: actions.at(-1).id + 1,
        action: "",
        actionValue: "",
      },
    ]);
  }
  function deleteAction(id) {
    setActions([...actions.filter((action) => action.id !== id)]);
  }

  return (
    <div className="text-sm">
      <label className="border rounded-md px-2 py-1 flex justify-between items-center">
        Title :
        <input
          className="border border-gray-600 p-1 rounded-md"
          value={conditionTitle}
          onChange={(e) => setConditionTitle(e.target.value)}
        />
      </label>
      Define Condition
      <div className="flex items-center gap-1">
        When
        <DropDown
          label={""}
          values={["", "Any", "Node", "All"]}
          value={requiredCondition}
          setValue={setRequiredCondition}
        />
        of all conditions are met
      </div>
      <div className="py-2 my-2 px-2 rounded-md bg-blue-500">
        {conditions.map((condition) => (
          <AddCondition
            key={condition.id}
            rule={condition}
            updateCondition={updateCondition}
            addCondition={() => addCondition()}
            deleteCondition={deleteCondition}
          />
        ))}
      </div>
      <div className="py-2 my-2 px-2 rounded-md bg-green-500">
        Then perform the following action(s)
        {actions.map((action) => (
          <AddAction
            key={action.id}
            actionObject={action}
            updateAction={updateAction}
            addAction={() => addAction()}
            deleteAction={deleteAction}
          />
        ))}
      </div>
    </div>
  );
};

export default ConditionalTrigger;
