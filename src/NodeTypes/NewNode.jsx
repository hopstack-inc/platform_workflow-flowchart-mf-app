import Multiselect from "multiselect-react-dropdown";
import React, { useContext, useState } from "react";
import ConditionalTrigger from "../components/ConditionalTrigger";
import DropDown from "../components/DropDown";
import { WorkflowContext } from "../context/WorkflowContext";
import { Button } from "../utils/Button";
import { getObjectList } from "../utils/function";
import {
  ancillaryTypes,
  attributeTypes,
  nodeType,
  sysActions,
  systemProvidedInfo,
  userActionsAndValidations,
} from "../utils/NodeTypeMaps";

const NewNode = () => {
  const {
    nodes,
    addNode,
    updateNode,
    selectedNode,
    currentNode,
    setShowModal,
  } = useContext(WorkflowContext);

  const [type, setType] = useState(
    !selectedNode?.type ? nodeType.types[0] : selectedNode.type,
  );

  const [attributes, setAttributes] = useState(attributeTypes);

  const [ancillaryNodeData, setAncillaryNodeData] = useState(
    selectedNode?.type === "ancillary" ? selectedNode : {},
  );
  const [coreNodeData, setCoreNodeData] = useState(
    selectedNode?.type === "core" ? selectedNode : {},
  );

  function handleOnChange(key, value) {
    if (key === "type") {
      setType(value);
    }
    if (type == "core") {
      let newData = coreNodeData;
      newData[key] = value;
      setCoreNodeData({ ...newData });
    } else {
      let newData = ancillaryNodeData;
      newData[key] = value;
      setAncillaryNodeData({ ...newData });
    }
  }

  function onSelect(selectedList) {
    handleOnChange("fields", selectedList);
  }
  function onRemove(selectedList, selectedItem) {
    handleOnChange("fields", [
      ...selectedList.filter((item) => item !== selectedItem),
    ]);
  }

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

  function getData() {
    if (type == "core")
      return {
        id: selectedNode ? selectedNode["id"] : null,
        type,
        ...coreNodeData,
      };
    else
      return {
        id: selectedNode ? selectedNode["id"] : null,
        type,
        ...ancillaryNodeData,
      };
  }

  return (
    <div className="p-4 flex flex-col gap-3 bg-white rounded-sm border border-black">
      {!coreNodeData.connectAfter &&
      (currentNode?.sysPositive || currentNode?.sysNegative) ? (
        <div>
          <DropDown
            label={"Connect After -> "}
            fieldType={"connectAfter"}
            setValue={handleOnChange}
            value={coreNodeData.connectAfter}
            values={["", "True", "False"]}
          />
        </div>
      ) : (
        <div>
          {selectedNode ? "Update Node" : "Add New Node"}
          <DropDown
            label={"Node Type -> "}
            fieldType={"type"}
            value={type}
            setValue={handleOnChange}
            values={nodeType.types}
          />
          {type == "core" && (
            <div className="flex flex-col gap-2">
              <div className="text-sm">
                System Provided Infomation
                <DropDown
                  label={"Type -> "}
                  value={coreNodeData.sysProvidedActionType}
                  fieldType={"sysProvidedActionType"}
                  setValue={handleOnChange}
                  values={systemProvidedInfo.types}
                />
              </div>
              {coreNodeData.sysProvidedActionType && (
                <Multiselect
                  options={getObjectList(
                    systemProvidedInfo[coreNodeData.sysProvidedActionType],
                  )}
                  selectedValues={coreNodeData.fields}
                  fieldType={"fields"}
                  onSelect={onSelect}
                  onRemove={onRemove}
                  displayValue="name"
                />
              )}
              <div className="h-[2px] mt-2 flex w-full bg-black"></div>
              <DropDown
                label={"User Actions -> "}
                value={coreNodeData.userAction}
                fieldType={"userAction"}
                setValue={handleOnChange}
                values={userActionsAndValidations.types}
              />
              <div className="h-[2px] mt-2 flex w-full bg-black"></div>
              <DropDown
                label={"Output -> "}
                value={coreNodeData.sysAction}
                fieldType={"sysAction"}
                setValue={handleOnChange}
                values={sysActions.types}
              />
              {coreNodeData.sysAction && (
                <div className="flex gap-3">
                  <DropDown
                    label={"True -> "}
                    value={coreNodeData.sysPositive}
                    fieldType={"sysPositive"}
                    setValue={handleOnChange}
                    values={sysActions[coreNodeData.sysAction]}
                  />
                  <DropDown
                    label={"False -> "}
                    value={coreNodeData.sysNegative}
                    setValue={handleOnChange}
                    fieldType={"sysNegative"}
                    values={sysActions[coreNodeData.sysAction]}
                  />
                </div>
              )}
              <DropDown
                label={"Loop to -> "}
                value={coreNodeData.loop}
                fieldType={"loop"}
                setValue={handleOnChange}
                values={["", ...nodes.map((node) => node.id)]}
              />
            </div>
          )}
        </div>
      )}
      {type == "ancillary" && (
        <div className="flex flex-col gap-2">
          <div className="text-sm">
            Ancillary Node type
            <DropDown
              label={"Type -> "}
              value={ancillaryNodeData.ancillaryType}
              fieldType={"ancillaryType"}
              setValue={handleOnChange}
              values={ancillaryTypes.types}
            />
          </div>
          {ancillaryNodeData.ancillaryType == "Conditional triggers" && (
            <ConditionalTrigger />
          )}
          {ancillaryNodeData.ancillaryType == "Printouts" && (
            <DropDown
              label={"Printouts -> "}
              value={ancillaryNodeData.printOut}
              fieldType="printOut"
              setValue={handleOnChange}
              values={sysActions.types}
            />
          )}
          {ancillaryNodeData.ancillaryType == "Notifications" && (
            <input
              className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
              value={ancillaryNodeData?.notification ?? ""}
              onChange={(e) => handleOnChange("notification", e.target.value)}
            />
          )}
          {ancillaryNodeData.ancillaryType == "Timers" && (
            <span>
              <input
                className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                value={ancillaryNodeData.timer ?? ""}
                onChange={(e) => handleOnChange("timer", e.target.value)}
              />{" "}
              Mins
            </span>
          )}
          {ancillaryNodeData.ancillaryType == "Approval Loops" && (
            <DropDown
              label={"Printouts -> "}
              value={ancillaryNodeData.approvalLoop}
              fieldType="approvalLoop"
              setValue={handleOnChange}
              values={sysActions.types}
            />
          )}
        </div>
      )}
      {type && (
        <Button
          title={selectedNode ? "Update Node" : "Add Node"}
          onClick={() => {
            setShowModal(false);
            const data = getData();
            selectedNode ? updateNode(data) : addNode(data);
          }}
        />
      )}
    </div>
  );
};

export default NewNode;
