import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import store from '../../store';
import { fetchAllPlayers, selectPlayers, upsertPlayer } from '../GamePage/store/playerSlice';
import { logout } from '../LoginPage/store/loginSlice';
import styles from './AdminPage.module.scss';

function AdminPage() {
    const players = useSelector(selectPlayers);

    const triggerLogout = () => {
        store.dispatch(logout());
    }

    useEffect(() => {
        store.dispatch(fetchAllPlayers());
        // store.dispatch((upsertPlayer({
        //     name: 'name2',
        //     record: '2323'
        // })));
    }, [])

    const editPlayer = (id: string) => {
        console.log(id)
    }

    const deletePlayer = (id: string) => {
        console.log(id)
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
                    {
                        players.map(player =>
                            <section key={player.id} className="grid grid-cols-2 pb-8 text-center font-bold hover:text-light ease-in-out duration-200;">
                                <span className='text-white place-self-end pb-2'>{player.name}  -  {player.record}</span>
                                <div className="w-24 ml-8 text-right place-self-start">
                                    <Menu as="div" className="relative inline-block text-left">
                                        <div>
                                            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-black hover:border-white border-2 hover:text-white focus-visible:ring-2 focus-visible:ring-white">
                                                Options
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="z-10 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <div className="px-1 py-1 ">
                                                    <Menu.Item>
                                                        <button onClick={() => editPlayer(player.id)}
                                                            className='text-dark hover:text-white hover:bg-black group flex w-full items-center rounded-md px-2 py-2 text-sm'
                                                        >
                                                            Edit
                                                        </button>

                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        <button onClick={() => deletePlayer(player.id)}
                                                            className='text-dark hover:text-white hover:bg-black group flex w-full items-center rounded-md px-2 py-2 text-sm'
                                                        >
                                                            Delete
                                                        </button>
                                                    </Menu.Item>
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </section>
                        )}
                </div>
            </section>
        </div>
    );
}

export default AdminPage;
