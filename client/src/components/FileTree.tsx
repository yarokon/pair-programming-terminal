import React, { useEffect, useState } from 'react';

const FIleTree = ({ props }) => {
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/tree');
      const data = await response.json();
      setTreeData(data);
    };
    fetchData();
  }, []);

  return <div>Component content</div>;
};

export default FIleTree;
