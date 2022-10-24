/* eslint-disable jsx-a11y/anchor-is-valid */
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import store from '../../store';
import { PlayerModel } from '../GamePage/store/playerModel';
import { deletePlayer, fetchAllPlayers, selectPlayers, upsertPlayer } from '../GamePage/store/playerSlice';
import { logout } from '../LoginPage/store/loginSlice';
import styles from './AdminPage.module.scss';

function AdminPage() {
    const players = useSelector(selectPlayers);
    const [dropdownOpen, setDropdownState] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState<Partial<PlayerModel> | undefined>();

    const triggerLogout = () => {
        store.dispatch(logout());
    }

    useEffect(() => {
        store.dispatch(fetchAllPlayers());
    }, [])

    const addPlayer = () => {
        store.dispatch((upsertPlayer({
            name: 'name22',
            record: '232333'
        })));
    }

    const triggerEdit = (player: Partial<PlayerModel> | undefined) => {
        if (player?.id) {
            store.dispatch((upsertPlayer({ ...player })));
        }

    }

    const triggerDelete = (id: string | undefined) => {
        if (id) {
            store.dispatch((deletePlayer({ id })));
        }
    }

    return (
        <div className="overflow-auto HideScrollbars inline-block relative min-w-full min-h-fit h-full object-cover">
            <section className="pt-16 h-fit" data-testid="AdminPage" >
                <div className="text-white h-fit HideScrollbars">
                    <section className="LinkTopContainer">
                        <Link to="/" className='LinkTop'>
                            <span>{"< home"}</span>
                        </Link>
                    </section>


                    <section className="LinkTopContainer AlignLeft">
                        <button onClick={() => triggerLogout()} className="justify-center w-full" >
                            <span className='LinkTop'>{"Logout"}</span>
                        </button>
                    </section>
                    <h1 className={styles.HeaderText}>
                        AdminPage
                    </h1>
                    <section className="grid grid-cols-1 pb-8 text-center hover:text-light ease-in-out duration-200;">
                        <button className="btn btn-primary place-self-center" onClick={() => addPlayer()} >
                            Add a player
                        </button>
                    </section>
                    {
                        players.map(player =>
                            <section key={player.id} className="grid grid-cols-2 pb-8 text-center font-bold hover:text-light ease-in-out duration-200;">
                                <span className='text-white place-self-end pb-4'>
                                    <span className='mr-8'>{player.name}</span>
                                    <span>{player.record}</span>
                                </span>
                                <div className="w-24 ml-8 text-right place-self-start">
                                    <div className={`dropdown`}>
                                        <label tabIndex={0} className="btn m-1" onClick={() => { setDropdownState(!dropdownOpen) }}>Actions</label>
                                        <ul tabIndex={0} className="dropdown-content menu bg-night p-2 shadow rounded-box w-52">
                                            <label onClick={() => { setSelectedPlayer(player) }} htmlFor="edit-modal" className="btn modal-button btn-ghost text-start justify-start">
                                                Edit
                                            </label>

                                            <label onClick={() => { setSelectedPlayer(player) }} htmlFor="delete-modal" className="btn modal-button btn-ghost text-start justify-start">
                                                Delete
                                            </label>
                                        </ul>
                                    </div>
                                </div>
                            </section>
                        )}
                </div>
            </section>
            <input type="checkbox" id="delete-modal" className="modal-toggle" />
            <label htmlFor="delete-modal" className="modal cursor-pointer">
                <label className="modal-box relative">
                    <span className="text-md">Are you sure you want to delete this player?</span>
                    <label htmlFor="delete-modal" className="btn btn-secondary float-right mt-4" onClick={() => triggerDelete(selectedPlayer?.id)}>Delete</label>
                </label>
            </label>

            <input type="checkbox" id="edit-modal" className="modal-toggle" />
            <label htmlFor="edit-modal" className="modal cursor-pointer">
                <label className="modal-box relative">
                    <h3 className="text-md font-bold">{selectedPlayer?.id}</h3>
                    <p className="py-4">{selectedPlayer?.name}</p>
                    <p className="py-4">{selectedPlayer?.record}</p>
                    <label htmlFor="edit-modal" className="btn btn-primary float-right" onClick={() => triggerEdit(selectedPlayer)}>Save</label>
                </label>
            </label>
        </div>
    );
}

export default AdminPage;
