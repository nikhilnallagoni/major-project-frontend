"use client"
import React,{useState} from 'react';
import { ReactFlow } from '@xyflow/react';
import Modal from 'react-modal'; // Importing the Modal component
import '@xyflow/react/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 690, y: 0 }, data: { label: 'Deep Learning (DL)' } },

  // Tools & Platforms
  { id: '2', position: { x: 120, y: 100 }, data: { label: 'Tools & Platforms' }, style: { backgroundColor: '#ffcccb' } },
  { id: '3', position: { x: -50, y: 200 }, data: { label: 'Python Frameworks' }, style: { backgroundColor: '#ffcccb' } },
    // Python frameworks
    { id: '24', position: { x: -50, y: 300 }, data: { label: 'TensorFlow & Keras' }, style: { backgroundColor: '#add8e6' } },
  { id: '25', position: { x: -50, y: 400 }, data: { label: 'PyTorch' }, style: { backgroundColor: '#add8e6' } },
  { id: '26', position: { x: -50, y: 500 }, data: { label: 'Fast.ai' }, style: { backgroundColor: '#add8e6' } },
  { id: '27', position: { x: -50, y: 600 }, data: { label: 'NumPy & Pandas' }, style: { backgroundColor: '#add8e6' } },

  { id: '4', position: { x: 120, y: 200 }, data: { label: 'Google Colab' }, style: { backgroundColor: '#add8e6' } },
  { id: '5', position: { x: 290, y: 200 }, data: { label: 'Jupyter Notebooks' }, style: { backgroundColor: '#add8e6' } },

  // Learning Paradigms
  { id: '6', position: { x: 690, y: 100 }, data: { label: 'Learning Paradigms' }, style: { backgroundColor: '#ffcccb' } },

  { id: '7', position: { x: 500, y: 200 }, data: { label: 'Supervised Learning' }, style: { backgroundColor: '#add8e6' } },
    // supervised learning tasks
    { id: '20', position: { x: 500, y: 300 }, data: { label: 'Classification' }, style: { backgroundColor: '#add8e6' } },
    { id: '21', position: { x: 500, y: 400 }, data: { label: 'Regression' }, style: { backgroundColor: '#add8e6' } },

  { id: '8', position: { x: 690, y: 200 }, data: { label: 'Unsupervised Learning' }, style: { backgroundColor: '#add8e6' } },
    // unsupervised learning tasks
    { id: '22', position: { x: 690, y: 300 }, data: { label: 'Clustering' }, style: { backgroundColor: '#add8e6' } },
    { id: '23', position: { x:690, y: 400 }, data: { label: 'Dimensionality Reduction' }, style: { backgroundColor: '#add8e6' } },

  { id: '9', position: { x: 880, y: 200 }, data: { label: 'Reinforcement Learning' }, style: { backgroundColor: '#add8e6' } },

  // DL Models
  { id: '11', position: { x: 1190, y: 100 }, data: { label: 'Deep Learning Models' }, style: { backgroundColor: '#ffcccb' } },
  { id: '12', position: { x: 1190, y: 200 }, data: { label: 'Feedforward Neural Networks (FNN)' }, style: { backgroundColor: '#add8e6' } },
  { id: '13', position: { x: 1190, y: 300 }, data: { label: 'Convolutional Neural Networks (CNN)' }, style: { backgroundColor: '#add8e6' } },
  { id: '14', position: { x: 1190, y: 400 }, data: { label: 'Recurrent Neural Networks (RNN)' }, style: { backgroundColor: '#add8e6' } },
  { id: '15', position: { x: 1190, y: 500 }, data: { label: 'Generative Adversarial Networks (GANs)' }, style: { backgroundColor: '#add8e6' } },
  { id: '28', position: { x: 1190, y: 600 }, data: { label: 'Autoencoders' }, style: { backgroundColor: '#add8e6' } },
  { id: '29', position: { x: 1190, y: 700 }, data: { label: 'Transformers' }, style: { backgroundColor: '#add8e6' } },

  // Datasets
  { id: '16', position: { x: 1590, y: 100 }, data: { label: 'Datasets' }, style: { backgroundColor: '#ffcccb' } },
  { id: '17', position: { x: 1590, y: 200 }, data: { label: 'ImageNet' }, style: { backgroundColor: '#add8e6' } },
  { id: '18', position: { x: 1590, y: 300 }, data: { label: 'COCO' }, style: { backgroundColor: '#add8e6' } },
  { id: '19', position: { x: 1590, y: 400 }, data: { label: 'Kaggle Datasets' }, style: { backgroundColor: '#add8e6' } },
];

const initialEdges = [
  // Connecting DL to Platforms, Models, and Datasets
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-6', source: '1', target: '6' },
  { id: 'e1-11', source: '1', target: '11' },
  { id: 'e1-16', source: '1', target: '16' },

  // DL Platforms connections
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e2-5', source: '2', target: '5' },
  // Python frameworks
  { id: 'e3-24', source: '3', target: '24' },
  { id: 'e3-25', source: '3', target: '25' },
  { id: 'e3-26', source: '3', target: '26' },
  { id: 'e3-27', source: '3', target: '27' },

  // Learning Paradigms connections
  { id: 'e7-20', source: '7', target: '20' },
  { id: 'e7-21', source: '7', target: '21' },

  { id: 'e8-22', source: '8', target: '22' },
  { id: 'e8-23', source: '8', target: '23' },

  { id: 'e6-7', source: '6', target: '7' },
  { id: 'e6-8', source: '6', target: '8' },
  { id: 'e6-9', source: '6', target: '9' },

  // DL models connections
  { id: 'e11-12', source: '11', target: '12' },
  { id: 'e11-13', source: '11', target: '13' },
  { id: 'e11-14', source: '11', target: '14' },
  { id: 'e11-15', source: '11', target: '15' },
  { id: 'e11-28', source: '11', target: '28' },
  { id: 'e11-29', source: '11', target: '29' },

  // Datasets connections
  { id: 'e16-17', source: '16', target: '17' },
  { id: 'e16-18', source: '16', target: '18' },
  { id: 'e16-19', source: '16', target: '19' },
];

export default function AIMap() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);
  
    // Handle the node click to open the modal
    const onNodeClick = (event, node) => {
      setSelectedNode(node);
      setModalIsOpen(true);
    };
  
    // Close the modal
    const closeModal = () => {
      setModalIsOpen(false);
      setSelectedNode(null);
    };
  return (
    <div className='w-full h-full'>
      <div 
        style={{ 
          width: '100%', 
          height: '100%', 
          
          overflow: 'auto', 
          boxSizing: 'border-box',
          backgroundColor: '#f9f9f9', 
          border: '1px solid #ccc',
          borderRadius: '8px'
        }}
      >
        <ReactFlow 
          nodes={initialNodes} 
          edges={initialEdges} 
          fitView 
          onNodeClick={onNodeClick} // Handle node click
        />
      </div>
      
    </div>
  );
}