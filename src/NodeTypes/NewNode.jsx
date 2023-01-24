import React, { useContext, useState } from "react";
import DropDown from "../components/DropDown";
import { WorkflowContext } from "../context/WorkflowContext";
import { Button } from "../utils/Button";
import {
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
  const [sysProvidedActionType, setSysProvidedActionType] = useState(
    !selectedNode?.sysProvidedActionType
      ? ""
      : selectedNode.sysProvidedActionType,
  );
  const [subSysProvidedActionType, setSubSysProvidedActionType] = useState(
    !selectedNode?.subSysProvidedActionType
      ? ""
      : selectedNode.subSysProvidedActionType,
  );

  const [userAction, setUserAction] = useState(
    !selectedNode?.userActions ? "" : selectedNode.userActions,
  );

  const [sysAction, setSysAction] = useState(
    !selectedNode?.sysAction ? "" : selectedNode.sysAction,
  );
  const [sysPositive, setSysPositive] = useState(
    !selectedNode?.sysPositive ? "" : selectedNode.sysPositive,
  );
  const [sysNegative, setSysNegative] = useState(
    !selectedNode?.sysNegative ? "" : selectedNode.sysNegative,
  );
  const [attributes, setAttributes] = useState(attributeTypes);

  const [loop, setLoop] = useState();
  const [connectAfter, setConnectAfter] = useState();

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

  console.log(currentNode, "CurrentNode");

  return (
    <div className="p-4 flex flex-col gap-3 bg-white rounded-sm border border-black">
      {!connectAfter && (currentNode?.sysPositive || currentNode?.sysNegative) ? (
        <div>
          <DropDown
            label={"Connect After -> "}
            setValue={setConnectAfter}
            value={connectAfter}
            values={["", "True", "False"]}
          />
        </div>
      ) : (
        <div>
          {selectedNode ? "Update Node" : "Add New Node"}
          <DropDown
            label={"Node Type -> "}
            value={type}
            setValue={setType}
            values={nodeType.types}
          />
          {type == "core" && (
            <div className="flex flex-col gap-2">
              <div className="h-[2px] flex w-full bg-black"></div>
              <div className="text-sm">
                System Provided Infomation
                <DropDown
                  label={"Type -> "}
                  value={sysProvidedActionType}
                  setValue={setSysProvidedActionType}
                  values={systemProvidedInfo.types}
                />
              </div>
              {sysProvidedActionType && (
                <DropDown
                  label={"Sub Type -> "}
                  value={subSysProvidedActionType}
                  setValue={setSubSysProvidedActionType}
                  values={systemProvidedInfo[sysProvidedActionType]}
                />
              )}
              <div className="h-[2px] mt-2 flex w-full bg-black"></div>
              <DropDown
                label={"User Actions -> "}
                value={userAction}
                setValue={setUserAction}
                values={userActionsAndValidations.types}
              />
              <div className="h-[2px] mt-2 flex w-full bg-black"></div>
              <DropDown
                label={"Output -> "}
                value={sysAction}
                setValue={setSysAction}
                values={sysActions.types}
              />
              {sysAction && (
                <div className="flex gap-3">
                  <DropDown
                    label={"True -> "}
                    value={sysNegative}
                    setValue={setSysNegative}
                    values={sysActions[sysAction]}
                  />
                  <DropDown
                    label={"False -> "}
                    value={sysPositive}
                    setValue={setSysPositive}
                    values={sysActions[sysAction]}
                  />
                </div>
              )}
              <DropDown
                label={"Loop to -> "}
                value={loop}
                setValue={setLoop}
                values={["", ...nodes.map((node) => node.id)]}
              />
            </div>
          )}
        </div>
      )}
      {type && (
        <Button
          title={"Add Node"}
          onClick={() => {
            setShowModal(false);
            let data = {
              id: selectedNode ? selectedNode["id"] : null,
              type,
              sysProvidedActionType,
              subSysProvidedActionType,
              userAction,
              sysAction,
              sysPositive,
              sysNegative,
              loop,
              connectAfter,
            };
            selectedNode ? updateNode(data) : addNode(data);
          }}
        />
      )}
    </div>
  );
};

export default NewNode;
