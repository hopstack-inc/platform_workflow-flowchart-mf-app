import React, { createContext, useState, useEffect } from "react";

const WorkflowContext = createContext({});

function WorkflowProvider(props) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [currentNode, setCurrentNode] = useState();
  const [selectedNode, setSelectedNode] = useState();
  const [lastPos, setLastPos] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [operation, setOperation] = useState();

  useEffect(() => {
    let workflows;
    try {
      axios.get("http://localhost:5045/api/workflows").then((res) => {
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
    } catch (error) {
      console.log(error);
    }
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
    data["id"] = `${nodes.length + (Math.random() * 100).toFixed(0)}`;
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
        (edge) => edge.source === currentNode.id,
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
        let newEdge = {};
        newEdge = {
          id: `${currentNode ? currentNode.id : nodes.at(-1).id}-${node.id}`,
          source: currentNode ? currentNode.id : nodes.at(-1).id.toString(),
          sourceHandle: data?.connectAfter,
          label: data?.connectAfter,
          target: node.id.toString(),
        };
        finalEdges.push(...[...edges, newEdge]);
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
      }}
      {...props}
    />
  );
}

export { WorkflowProvider, WorkflowContext };
