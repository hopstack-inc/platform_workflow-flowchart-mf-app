import React, { useCallback, useContext, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import ButtonEdge from "./EdgeTypes/ButtonEdge";
import { updateEdge } from "reactflow/dist/esm";
import DataNode from "./NodeTypes/DataNode";
import { SmartBezierEdge } from "@tisoap/react-flow-smart-edge";
import Modal from "./utils/Modal";
import NewNode from "./NodeTypes/NewNode";
import { Button } from "./utils/Button";
import axios from "axios";
import { WorkflowContext } from "./context/WorkflowContext";

const rfStyle = {
  backgroundColor: "#B8CEFF",
};

const nodeTypes = {
  data: DataNode,
};
const edgeTypes = {
  buttonedge: ButtonEdge,
  smartEdge: SmartBezierEdge,
};

const WorkflowChart = () => {
  const {
    nodes,
    edges,
    clearWorkflow,
    showModal,
    setShowModal,
    setNodes,
    setEdges,
  } = useContext(WorkflowContext);

  function getJson() {
    let flow = {};
    nodes.forEach((node) => {
      const events = {};
      const id = node.id;
      events.onConfirm = edges.find((edge) => edge.source == node.id)?.target??null;
      events.onCancel =
        edges.find((edge) => edge.target == node.id)?.source ?? null;
      const jsonExtract = {
        id,
        type: node.data.type,
        layout: { fields: node.data.fields?.map((field) => field.name) },
        userInputs: node.data.userAction,
        events,
      };
      flow[id] = jsonExtract;
    });

    if (flow.length > 0)
      // axios
      //   .post("http://localhost:5045/api/workflows", {
      //     workflow: flow,
      //     activity: "Receiving",
      //   })
      //   .then((e) => alert("Added new workflow"));
      alert("Added new workflow");
    else alert("Add at least one node");
    console.log(JSON.stringify(flow), "JSON");
  }

  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) =>
      setEdges((els) => updateEdge(oldEdge, newConnection, els)),
    [],
  );
  const onNodesChange = useCallback(
    (changes) => {
      setNodes(applyNodeChanges(changes, nodes));
    },
    [nodes, setNodes],
  );

  const onEdgesChange = useCallback(
    (changes) => {
      setEdges(applyEdgeChanges(changes, edges));
    },
    [edges],
  );

  const onConnect = (params) =>
    setEdges((els) => {
      var edge = {
        ...params,
        type: "smartEdge",
        deletable: true,
      };
      return addEdge(edge, els);
    });

  return (
    <div className="h-full w-full relative">
      <div className="absolute flex flex-col px-2 py-10 w-40 h-full shadow-lg bg-white z-10 left-0 top-0">
        <Button onClick={clearWorkflow} title={"New WF"} />
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <NewNode />
        </Modal>
        <Button onClick={getJson} title={"JSON"} />
      </div>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onEdgeUpdate={onEdgeUpdate}
        fitView
        style={rfStyle}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default WorkflowChart;
