import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import TextUpdaterNode from "./TextUpdater";
import ButtonEdge from "./ButtonEdge";
import { updateEdge } from "reactflow/dist/esm";
import ActionsNode from "./Actions";
import DataNode from "./dataNode";
import { SmartBezierEdge } from "@tisoap/react-flow-smart-edge";
import Modal from "./Modal";
import NewNode from "./NewNode";
import { Button } from "./Button";
import axios from "axios";

const rfStyle = {
  backgroundColor: "#B8CEFF",
};

const nodeTypes = {
  textUpdater: TextUpdaterNode,
  action: ActionsNode,
  data: DataNode,
};
const edgeTypes = {
  buttonedge: ButtonEdge,
  smartEdge: SmartBezierEdge,
};

const WorkflowChart = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [lastPos, setLastPos] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let workflows;
    axios.get("http://localhost:5045/api/workflows").then((res) => {
      console.log(res.data.at(-1).workflow);
      workflows = res.data.at(-1).workflow;
      const convertedNodes = [];
      const convertedEdges = [];
      workflows?.forEach((node, index) => {
        convertedNodes.push(...getNodeFrom(node, index));
      });
      convertedNodes.forEach((node) =>
        convertedEdges.push(...getEdgeFrom(node)),
      );
      setLastPos(convertedNodes.length * 100 + 200);
      setNodes([...convertedNodes]);
      setEdges([...convertedEdges]);
    });
  }, []);

  function getNodeFrom(node, index, isSub = false) {
    const nodeList = [];
    if (node["sub-workflow"] != null) {
      node["sub-workflow"].forEach((element) =>
        nodeList.push(...getNodeFrom(element, index + 1, true)),
      );
    }
    nodeList.push({
      id: `${node.id}`,
      position: { x: isSub ? 250 : 100, y: index * 150 + 300 },
      data: node,
      type: "data",
    });
    return nodeList;
  }

  function getEdgeFrom(node) {
    if (node.data.next) {
      const list = [];
      for (const id of node.data.next) {
        list.push({
          id: `${node.id}-${id}`,
          source: node.id,
          target: id,
          type: "smartEdge",
        });
      }
      return list;
    }
  }

  function getLastPos() {
    setLastPos(lastPos + 200);
    return lastPos + 200;
  }

  function addNode(data) {
    let node = {
      id: `${nodes.length + (Math.random() * 100).toFixed(0)}`,
      position: { x: 100, y: getLastPos() },
      data: data,
      type: "data",
    };
    let nodeList = [...nodes, node];
    setNodes(nodeList);
    setEdges([
      ...edges,
      {
        id: `${nodes.at(-1).id}-${node.id}`,
        source: nodes.at(-1).id.toString(),
        target: node.id.toString(),
      },
    ]);
  }
  function getJson() {
    let flow = [];
    nodes.forEach((node) => {
      const nextList = [];
      edges
        .filter((edge) => edge.source == node.id)
        .forEach((edge) => nextList.push(edge.target));
      const jsonExtract = {
        id: node.id,
        next: nextList,
        type: node.data.type,
        stage: node.data.stage,
        target: node.data.target,
        "sub-workflow": node.data["sub-workflow"],
        attributes: node.data.attributes,
      };
      flow.push(jsonExtract);
    });

    if (flow.length > 0)
      axios
        .post("http://localhost:5045/api/workflows", {
          workflow: flow,
          activity: "Receiving",
        })
        .then((e) => alert("Added new workflow"));
    else 
    alert("Add at least one node")
    console.log(JSON.stringify(flow), "JSON");
  }

  function clearWorkflow() {
    setNodes([]);
    setEdges([]);
    setLastPos(0);
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
          <NewNode addNode={addNode} setShowModal={setShowModal} />
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
