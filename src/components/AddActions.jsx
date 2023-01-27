import React, { useState } from "react";
import DropDown from "./DropDown";

const AddAction = ({ actionObject, updateAction, addAction, deleteAction }) => {
  const [action, setAction] = useState(
    actionObject.action ? actionObject.action : "",
  );
  const [actionValue, setActionValue] = useState(
    actionObject.actionValue ? actionObject.actionValue : "",
  );

  return (
    <div className="flex my-2 flex-col gap-2">
      <div className="flex gap-2">
        <DropDown
          values={["", "Group", "Individual"]}
          value={action}
          setValue={setAction}
        />
        <DropDown
          values={["", "Yes", "No"]}
          value={actionValue}
          setValue={setActionValue}
        />
      </div>
      <div className="flex text-white gap-2">
        <div
          onClick={() =>
            updateAction({
              id: actionObject.id,
              action,
              actionValue,
            })
          }
          className="rounded-full px-1 py-1 cursor-pointer border border-white">
          update
        </div>
        <div
          onClick={addAction}
          className="rounded-full px-1 py-1 cursor-pointer border border-white">
          Add
        </div>
        <div
          onClick={() => deleteAction(actionObject.id)}
          className="rounded-full px-1 py-1 cursor-pointer border border-white">
          delete
        </div>
      </div>
    </div>
  );
};

export default AddAction;
