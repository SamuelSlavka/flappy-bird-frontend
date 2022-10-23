import { Link, useNavigate } from 'react-router-dom';
import store from '../../store';
import { login, selectJwt } from '../LoginPage/store/loginSlice';
import styles from './LoginPage.module.scss';

import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const access_token = useSelector(selectJwt);

    const triggerLogin = () => {
        store.dispatch(login({ username, password }));
    }

    useEffect(() => {
        console.log(access_token)
        if(access_token) {
            navigate('/admin')
        }
    }, [access_token, navigate])

    return (
        <div className="overflow-auto HideScrollbars inline-block relative min-w-full min-h-fit h-full object-cover">
            <section className="pt-16 h-full text-white HideScrollbars" data-testid="LoginPage" >
                <section className="LinkTopContainer">
                    <Link to="/" className='LinkTop'>
                        <span>{"< home"}</span>
                    </Link>
                </section>
                <section className='grid h-full'>
                    <section className="place-self-center w-fit">
                        <form className='flex flex-col w-fit justify-center'>
                            <label> Username: </label>
                            <input
                                className='text-black rounded p-1'
                                type="text"
                                name="username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder="Username"
                                required
                            />
                            <label className='mt-4'> Password: </label>
                            <input
                                className='text-black rounded p-1'
                                type="password"
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                        </form>
                        <button onClick={() => triggerLogin()} className="justify-center w-full" >
                            <h3 className={`${styles.PointsText} mt-6`}>
                                <span>{"Login"}</span>
                            </h3>
                        </button>
                    </section>
                </section>
            </section>

            <ToastContainer />
        </div>
    );
}

export default LoginPage;
