/* eslint-disable jsx-a11y/anchor-is-valid */
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import store from '../../store/store';
import { PlayerModel } from '../GamePage/store/playerModel';
import { deletePlayer, fetchAllPlayers, selectPage, selectAllPlayers, selectTotalItems, setPage, upsertPlayer } from '../GamePage/store/playerSlice';
import { logout } from '../LoginPage/store/loginSlice';

function AdminPage() {
    const pageLimit = 10;

    const players: PlayerModel[] = useSelector(selectAllPlayers);
    const page: number = useSelector(selectPage);
    const tatalItems: number = useSelector(selectTotalItems);

    const [selectedPlayer, setSelectedPlayer] = useState<Partial<PlayerModel> | undefined>();
    const handleChange = (e: any) => setSelectedPlayer(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

    const triggerLogout = () => {
        store.dispatch(logout());
    }

    useEffect(() => {
        store.dispatch(fetchAllPlayers({ page, limit: pageLimit }));
    }, [page])

    const triggerUpsert = (player: Partial<PlayerModel> | undefined) => {
        store.dispatch((upsertPlayer({
            player: { name: player?.name, record: player?.record?.toString() },
            page,
            limit: pageLimit,
        })));
        setSelectedPlayer({});
    }

    const triggerDelete = (id: string | undefined) => {
        if (id) {
            store.dispatch((deletePlayer({
                id,
                page,
                limit: pageLimit
            })));
        }
    }

    return (
        <div className="overflow-auto HideScrollbars relative min-w-full min-h-fit h-full object-cover flex flex-col justify-between">
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
            <section className="pt-16 h-fit" data-testid="AdminPage" >
                <div className="text-white h-fit w-full HideScrollbars d-flex flex-col">
                    <div className="flex justify-center">
                        <p className="text-center text-2xl font-bold pt-2 pr-8">Plays</p>
                        <label htmlFor="edit-modal" className="btn modal-button btn-primary text-start justify-start">
                            Add a play
                        </label>
                    </div>

                    <div className="flex justify-center pt-4">
                        <section className='w-xs max-w-fit'>
                            {players.map(player =>
                                <section key={player.id} className="grid content-between grid-cols-3 pb-8 text-center font-bold hover:text-light ease-in-out duration-200;">
                                    <span className='text-white place-self-end pb-4'>
                                        <span className='mr-8'>{player.name}</span>
                                    </span>
                                    <span className='text-white place-self-end pb-4'>
                                        <span>{player.record}</span>
                                    </span>
                                    <div className="w-24 ml-4">
                                        <div className={`dropdown`}>
                                            <label tabIndex={0} className="btn m-1" >
                                                <FontAwesomeIcon icon={solid('chevron-down')} />
                                            </label>
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
                                </section>)}
                        </section>
                    </div>
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
                    <h3 className="text-md font-bold">Player {selectedPlayer?.id}</h3>

                    <label className="label">
                        <span className="label-text text-white">name</span>
                    </label>
                    <input
                        className='input input-bordered w-full max-w-xs inputField'
                        type="text"
                        name="name"
                        value={selectedPlayer?.name || ''}
                        onChange={handleChange}
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
                        value={selectedPlayer?.record || ''}
                        onChange={handleChange}
                        placeholder="123"
                        required
                    />
                    <label htmlFor="edit-modal" className="btn btn-primary float-right" onClick={() => triggerUpsert(selectedPlayer)}>Save</label>
                </label>
            </label>
            <div className='w-full flex justify-items-center justify-center justify-self-end mb-4'>
                <div className="btn-group justify-self-center">
                    <button className="btn" disabled={page === 0} onClick={() => store.dispatch(setPage({ page: page - 1 }))}>«</button>
                    <button className="btn">Page {page}</button>
                    <button className="btn" disabled={((page + 1) * pageLimit) >= tatalItems} onClick={() => store.dispatch(setPage({ page: page + 1 }))}>»</button>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
