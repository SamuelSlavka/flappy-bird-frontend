import React, { FC } from 'react';
import { PlayerModel } from '../../../pages/GamePage/store/playerModel';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface PlayProps {
  player: PlayerModel;
  setSelectedPlayer: (params: any) => any;
  isAdmin?: boolean;
}

const Play: FC<PlayProps> = (props) => {
  return (
    <section key={props.player.id} className={`grid grid-cols-${props.isAdmin ? 3 : 2} content-between pb-8 text-center font-bold hover:text-light ease-in-out duration-200`}>
      <span className='text-white grid content-center'>
        <span className=''>{props.player.name}</span>
      </span>
      <span className='text-white mx-8 grid content-center'>
        <span >{props.player.record}</span>
      </span>
      {props.isAdmin ?
        <div className="w-24 ml-4">
          <div className={`dropdown`}>
            <label tabIndex={0} className="btn m-1" >
              <FontAwesomeIcon icon={solid('chevron-down')} />
            </label>
            <ul tabIndex={0} className="dropdown-content menu bg-night p-2 shadow rounded-box w-52">
              <label onClick={() => { props.setSelectedPlayer(props.player) }} htmlFor="edit-modal" className="btn modal-button btn-ghost text-start justify-start">
                Edit
              </label>

              <label onClick={() => { props.setSelectedPlayer(props.player) }} htmlFor="delete-modal" className="btn modal-button btn-ghost text-start justify-start">
                Delete
              </label>
            </ul>
          </div>
        </div> : <></>}
    </section>
  );
};

export default Play;
