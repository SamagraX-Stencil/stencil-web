import React from 'react';

const MoleculePreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS();
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ flex: 1, padding: '20px' }}>
        <h1>{data.title}</h1>
        <p>{data.description}</p>
        {/* Render your molecule component here using data.config */}
      </div>
      <div style={{ flex: 1, padding: '20px' }}>
        {/* Assume this is where your molecule is rendered */}
        
      </div>
    </div>
  );
}

export default MoleculePreview;
