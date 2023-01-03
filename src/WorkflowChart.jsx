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
import testJSON from "./test";
import { SmartBezierEdge } from "@tisoap/react-flow-smart-edge";
import Modal from "./Modal";
import NewNode from "./NewNode";

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
    const convertedNodes = [];
    const convertedEdges = [];
    testJSON.forEach((node, index) => {
      convertedNodes.push(
        ...getNodeFrom(node, node["sub-workflow"],  index),
      );
    });
    convertedNodes.forEach((node) => convertedEdges.push(getEdgeFrom(node)));
    console.log(convertedNodes, "Edges");
    setLastPos(convertedNodes.length * 100+200);
    setNodes([...nodes, ...convertedNodes]);
    setEdges([...convertedEdges]);
  }, []);

  function getNodeFrom(node, subWorkflow, index) {
    const nodeList = [];
    if (subWorkflow != null) {
      subWorkflow.forEach((element) =>
        nodeList.push(
          ...getNodeFrom(
            element,
            element["sub-workflow"],
            index + 1,
          ),
        ),
      );
    }
    const newNode = {
      id: `${node.id}`,
      position: { x: 100, y: index * 100 + 200 },
      data: node,
      type: "data",
    };
    // if (parent) {
    //   newNode["parentNode"] = parent;
    //   newNode["extent"] = "parent";
    // }

    nodeList.push(newNode);
    return nodeList;
  }
  function getEdgeFrom(node) {
    if (node.data.next)
      return {
        id: `${node.id}-${node.data.next}`,
        source: node.id,
        target: node.data.next,
        type: "smartEdge",
      };
  }
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

  function getLastPos() {
    setLastPos(lastPos + 200);
    return lastPos + 200;
  }

  const onConnect = (params) =>
    setEdges((els) => {
      var edge = {
        ...params,
        type: "smartEdge",
        deletable: true,
      };
      return addEdge(edge, els);
    });

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

  function addActionNode() {
    let node = {
      id: `${nodes.length + 1}`,
      position: { x: 0, y: getLastPos() + 100 },
      data: { label: `${nodes.length + 1}` },
      type: "action",
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

  function addCondition() {
    let newNodes = [
      {
        id: `${nodes.length + 1}`,
        position: { x: 0, y: getLastPos() + 100 },
        data: { label: "If node" },
      },
      {
        id: `${nodes.length + 2}`,
        position: { x: -100, y: getLastPos() + 200 },
        data: { label: "Yes Node" },
      },
      {
        id: `${nodes.length + 3}`,
        position: { x: 100, y: getLastPos() + 200 },
        data: { label: "No Node" },
      },
    ];
    setNodes([...nodes, ...newNodes]);
    setEdges([
      ...edges,
      {
        id: `${nodes.at(-1).id}-${newNodes[0].id}`,
        source: nodes.at(-1).id.toString(),
        target: newNodes[0].id.toString(),
      },
      {
        id: `${nodes.length + 1}-${nodes.length + 2}`,
        source: newNodes[0].id.toString(),
        target: newNodes[1].id.toString(),
        label: "Yes",
        type: "buttonedge",
        animated: true,
        style: { stroke: "green" },
      },
      {
        id: `${nodes.length + 1}-${nodes.length + 3}`,
        source: newNodes[0].id.toString(),
        target: newNodes[2].id.toString(),
        label: "No",
        type: "buttonedge",
        animated: true,
        style: { stroke: "red" },
      },
    ]);
  }

  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) =>
      setEdges((els) => updateEdge(oldEdge, newConnection, els)),
    [],
  );

  function getButton(onClick, title) {
    return (
      <button
        className="rounded-md shadow-md border text-medium my-2 text-base text-black border-blue-600 px-4 py-2 flex items-start justify-center"
        onClick={onClick}>
        {title}
      </button>
    );
  }

  function getJson() {
    let flow = [];
    nodes.forEach((node) => {
      flow.push({
        id: node.id,
        child: edges.find((edge) => {
          return edge.source == node.id;
        }),
        data: node.data,
        type: node.type,
      });
    });
    console.log(JSON.stringify(flow), "JSON");
  }

  return (
    <div className="h-full w-full relative">
      <div className="absolute flex flex-col px-2 py-10 w-40 h-full shadow-lg bg-white z-10 left-0 top-0">
        {getButton(addNode, "Add")}
        {getButton(addCondition, "Condition")}
        {getButton(addActionNode, "Action")}
        {getButton(getJson, "JSON")}
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <NewNode addNode={addNode} setShowModal={setShowModal} />
        </Modal>
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
