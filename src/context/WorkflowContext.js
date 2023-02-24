import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import { getObjectList } from "../utils/function";

const WorkflowContext = createContext({});

function WorkflowProvider(props) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [currentNode, setCurrentNode] = useState();
  const [selectedNode, setSelectedNode] = useState();
  const [lastPos, setLastPos] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [operation, setOperation] = useState();
  const [workFlows, setWorkFlows] = useState([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [newWorkflow, setNewWorkflow] = useState(false);
  const [rootNode, setRootNode] = useState();

  useEffect(() => {
    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:5048/api/getFlowModels",
      headers: {
        tenant:
          '{"id":"62cdb0ac6227b7ed224d79aa","name":"Hopstack Inc","subdomain":"hst","apiGateway":"https://api.uat.ap-southeast-1.hopstack.io","socketService":"https://api.uat.ap-southeast-1.hopstack.io","enabledSimulations":false,"active":true,"cubeService":"https://apse1-uat-analytics.hopstack.io","typeOfCustomer":"3PL","active":true}',
        "Content-Type": "application/json",
      },
    };
    try {
      axios(config).then((res) => {
        setWorkFlows(res.data.entities);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (selectedWorkflow) {
      const convertedNodes = [];
      const convertedEdges = [];
      Object.keys(selectedWorkflow.nodes).forEach((key, index) => {
        convertedNodes.push(
          ...getNodeFrom(key, selectedWorkflow.nodes[key], index),
        );
      });
      console.log("convertedNodes", convertedNodes);
      convertedNodes.forEach((node) =>
        convertedEdges.push(...getEdgeFrom(node)),
      );
      setLastPos(convertedNodes.length * 100 + 200);
      setNodes([...convertedNodes]);
      setEdges([...convertedEdges]);
    }
  }, [selectedWorkflow]);

  function getNodeFrom(id, node, index) {
    const nodeList = [];

    let transformedData = {
      fields: node.layout?.fields ? getObjectList(node.layout.fields) : null,
      type: node.type,
      systemInfo: node.systemInfo,
      userInputs: node.userInputs,
      next: node.events.onConfirm.next,
      id: id,
    };

    nodeList.push({
      id: `${id}`,
      position: { x: 100, y: index * 150 + 300 },
      data: transformedData,
      type: "data",
    });
    return nodeList;
  }

  function getEdgeFrom(node) {
    const list = [];
    if (node.data.next) {
      list.push({
        id: `${node.id}-${node.data.next}`,
        source: node.id,
        target: node.data.next,
        type: "smartEdge",
      });
    }
    return list;
  }

  function getLastPos() {
    setLastPos(lastPos + 200);
    return lastPos + 200;
  }

  function addNode(data) {
    data["id"] = `${nodes.length + (Math.random() * 100).toFixed(0)}`;
    if (nodes.length == 0) setRootNode(data.id);
    let node = {
      id: data.id,
      position: { x: 100, y: getLastPos() },
      data: data,
      type: "data",
    };
    let nodeList = [...nodes, node];
    setNodes(nodeList);
    const finalEdges = [];
    if (data.loop) {
      finalEdges.push({
        id: `${node.id}-${data.loop}`,
        source: node.id.toString(),
        target: data.loop,
        type: "smartEdge",
      });
    }
    if (nodeList.length > 1) {
      let connectAfterEdge = edges.find(
        (edge) => edge.source === currentNode?.id,
      );
      if (connectAfterEdge && !data?.connectAfter) {
        finalEdges.push(
          ...edges.filter((edge) => edge.source !== currentNode.id),
        );
        finalEdges.push(
          ...[
            {
              id: `${connectAfterEdge.source}-${node.id}`,
              source: connectAfterEdge.source,
              target: node.id.toString(),
            },
            {
              id: `${node.id}-${connectAfterEdge.target}`,
              source: node.id.toString(),
              target: connectAfterEdge.target,
            },
          ],
        );
      } else {
        console.log(currentNode, "currentNode");
        let newEdge = {
          id: `${currentNode ? currentNode.id : nodes.at(-1).id}-${node.id}`,
          source: currentNode ? currentNode.id : nodes.at(-1).id.toString(),
          target: node.id.toString(),
        };
        finalEdges.push(...edges, newEdge);
      }
    }
    setEdges(finalEdges);
  }

  function newNode(data) {
    setCurrentNode(data);
    setOperation("add");
    setShowModal(true);
  }

  function editNode(data) {
    setSelectedNode(data);
    setOperation("edit");
    setShowModal(true);
  }

  function deleteNode(data) {
    setOperation("delete");
    console.log(data, "Delete Node");
  }

  function updateNode(data) {
    let toUpdate = nodes.find((node) => node.id == data.id);
    toUpdate.data = data;
    setNodes([...nodes.filter((node) => node.id !== data.id), toUpdate]);
    setSelectedNode(null);
  }

  function clearWorkflow() {
    setNodes([]);
    setEdges([]);
    setLastPos(0);
  }
  return (
    <WorkflowContext.Provider
      value={{
        nodes,
        setNodes,
        edges,
        setEdges,
        showModal,
        setShowModal,
        currentNode,
        selectedNode,
        operation,
        clearWorkflow,
        addNode,
        newNode,
        editNode,
        updateNode,
        deleteNode,
        getLastPos,
        lastPos,
        newWorkflow,
        setNewWorkflow,
        selectedWorkflow,
        setSelectedWorkflow,
        workFlows,
        rootNode,
        setRootNode,
      }}
      {...props}
    />
  );
}

export { WorkflowProvider, WorkflowContext };
