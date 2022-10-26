/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import store from '../../store/store';
import { PlayerModel } from '../GamePage/store/playerModel';
import { deletePlayer, fetchAllPlayers, selectPage, selectAllPlayers, selectTotalItems, setPage, upsertPlayer } from '../GamePage/store/playerSlice';
import { logout } from '../LoginPage/store/loginSlice';
import Play from './components/Play/Play';
import FormModal from './components/FormModal/FormModal';
import ConfirmationModal from './components/ConfirmationModal/ConfirmationModal';

function AdminPage() {
    const pageLimit = 8;

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
                            {players.map(player => <Play player={player} setSelectedPlayer={setSelectedPlayer} />)}
                        </section>
                    </div>
                </div>
            </section>
            <input type="checkbox" id="delete-modal" className="modal-toggle" />
            <ConfirmationModal selectedPlayer={selectedPlayer} triggerDelete={triggerDelete} />
            <input type="checkbox" id="edit-modal" className="modal-toggle" />
            <FormModal selectedPlayer={selectedPlayer} handleChange={handleChange} triggerUpsert={triggerUpsert} />

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
