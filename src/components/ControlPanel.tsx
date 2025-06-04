import React from 'react';

interface Props {
  onHit: () => void;
  onStand: () => void;
  disabled: boolean;
}

export const ControlPanel: React.FC<Props> = ({ onHit, onStand, disabled }) => {
  return (
    <div className="controls">
      <button onClick={onHit} disabled={disabled}>Hit</button>
      <button onClick={onStand} disabled={disabled}>Stand</button>
    </div>
  );
};
