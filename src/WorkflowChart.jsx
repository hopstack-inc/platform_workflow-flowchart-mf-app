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
import { WorkflowContext } from "./context/WorkflowContext";
import axios from "axios";

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
    selectedWorkflow,
    newWorkflow,
    rootNode,
  } = useContext(WorkflowContext);

  function getJson() {
    let flow = {};
    nodes.forEach((node) => {
      const events = {};
      const id = node.id;
      events.onConfirm = {
        next: edges.find((edge) => edge.source == node.id)?.target ?? null,
      };
      events.onCancel = {
        next: edges.find((edge) => edge.target == node.id)?.source ?? null,
      };
      const jsonExtract = {
        id,
        type: node.data.type,
        layout: { fields: node.data.fields?.map((field) => field.name) },
        userInputs: node.data.userInputs,
        systemInfo: node.data.systemInfo,
        events,
      };
      flow[id] = jsonExtract;
    });
    var data = selectedWorkflow;
    data["nodes"] = flow;
    if (newWorkflow)
      data["trigger"] = {
        start: [
          {
            conditionType: "all",
            conditions: {
              warehouse: "warehouse-1",
              client: "client-1",
              location: "ABCD",
            },
            next: rootNode,
          },
        ],
        end: null,
      };

    console.log("NewWF", newWorkflow);

    if (!newWorkflow) delete data["tenant"];

    let stringData = JSON.stringify(data);
    var config = {
      method: newWorkflow ? "post" : "put",
      maxBodyLength: Infinity,
      url:
        "http://localhost:5048/api/flowModels" +
        `${newWorkflow ? "" : `/${data.id}`}`,
      headers: {
        tenant:
          '{"id":"62cdb0ac6227b7ed224d79aa","name":"Hopstack Inc","subdomain":"hst","apiGateway":"https://api.uat.ap-southeast-1.hopstack.io","socketService":"https://api.uat.ap-southeast-1.hopstack.io","enabledSimulations":false,"active":true,"cubeService":"https://apse1-uat-analytics.hopstack.io","typeOfCustomer":"3PL","active":true}',
        "Content-Type": "application/json",
      },
      data: stringData,
    };

    console.log(stringData, "stringData");
    console.log(config, "config");
    console.log(data, "data");

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
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
