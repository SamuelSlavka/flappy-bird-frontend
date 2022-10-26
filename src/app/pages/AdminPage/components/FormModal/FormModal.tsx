import React, { FC } from 'react';
import { PlayerModel } from '../../../GamePage/store/playerModel';

interface FormModalProps {
  selectedPlayer: Partial<PlayerModel> | undefined;
  handleChange: (params: any) => any;
  triggerUpsert: (params: any) => any;
}

const FormModal: FC<FormModalProps> = (props) => {
  return (
    <label htmlFor="edit-modal" className="modal cursor-pointer">
    <label className="modal-box relative">
        <h3 className="text-md font-bold">Player {props.selectedPlayer?.id}</h3>

        <label className="label">
            <span className="label-text text-white">name</span>
        </label>
        <input
            className='input input-bordered w-full max-w-xs inputField'
            type="text"
            name="name"
            value={props.selectedPlayer?.name || ''}
            onChange={props.handleChange}
            placeholder="name"
            required
        />
        <label className="label">
            <span className="label-text text-white">name</span>
        </label>
        <input
            className='input input-bordered w-full max-w-xs inputField'
            type="text"
            name="record"
            value={props.selectedPlayer?.record || ''}
            onChange={props.handleChange}
            placeholder="123"
            required
        />
        <label htmlFor="edit-modal" className="btn btn-primary float-right" onClick={() => props.triggerUpsert(props.selectedPlayer)}>Save</label>
    </label>
</label>
  );
};

export default FormModal;
