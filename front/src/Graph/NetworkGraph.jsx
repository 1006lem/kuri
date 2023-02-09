import { Network } from "vis-network";
import React, { useState, useRef, useEffect } from "react";

import "./../scss/NetworkGraph.scss";
import { schemeDark2, select } from "d3";

const NetworkGraph = ({ nodes, setNodes, edges, setEdges }) => {
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    const container = document.querySelector("#myNetwork");
    const data = {
      nodes: nodes.map((node) => ({
        ...node,
        label: node.name,
        shape: "dot",
        size: 70,
        font: { size: 30 },
      })),
      edges: edges,
    };
    const options = {
      height: "1000px",
      width: "1700px",
      interaction: {
        zoomView: false,
      },
      nodes: {
        shape: "circle", // ��� ��� ����
        size: 30, // ����� ũ��
        font: {
          size: 20, // �� ��Ʈ ũ��
        },

        borderWidth: 2,
        borderWidthSelected: 4,
      },
      edges: {
        width: 5, // ���� ����
        length: 300,
        color: {
          color: "gray", // ���� ����
          highlight: "black", // ���õ� ���� ����
        },
        smooth: {
          type: "curvedCCW", // ���� ��� ����
        },
      },
    };
    const network = new Network(container, data, options);

    network.on("click", (params) => {
      if (params.nodes.length) {
        setSelectedNode(nodes.find((node) => node.id === params.nodes[0]));
      }
    });
  }, []);

  return (
    <div>
      <h id="myNetwork"></h>
      {selectedNode && (
        <div className="node-info-container">
          <div className="node-info">
            <h1>{selectedNode.name}</h1>
            <p>namespace: {selectedNode.namespace}</p>
            <p>label:</p>
            {Object.entries(selectedNode.label).map(([key, value]) => (
              <p key={key} style={{ paddingLeft: "20px" }}>
                {key}: {value}
              </p>
            ))}
            <p>ip: {selectedNode.ip}</p>
            <p>port: {selectedNode.port}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkGraph;
