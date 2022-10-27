import React, { FC } from 'react';
import { PlayerModel } from '../../../pages/GamePage/store/playerModel';

interface ConfirmationModalProps {
  selectedPlayer: Partial<PlayerModel> | undefined;
  triggerDelete: (params: any) => any;
}

const ConfirmationModal: FC<ConfirmationModalProps> = (props) => {
  return (
    <label htmlFor="delete-modal" className="modal cursor-pointer">
      <label className="modal-box relative">
        <span className="text-md">Are you sure you want to delete this player?</span>
        <label htmlFor="delete-modal" className="btn btn-secondary float-right mt-4" onClick={() => props.triggerDelete(props.selectedPlayer?.id)}>Delete</label>
      </label>
    </label>
  );
};

export default ConfirmationModal;
