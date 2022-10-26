import { Link, useNavigate } from 'react-router-dom';
import store from '../../store/store';
import { login, selectJwt } from '../LoginPage/store/loginSlice';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginTrigger, setLoginTrigger] = useState(false);

    const navigate = useNavigate();
    const access_token = useSelector(selectJwt);

    const triggerLogin = () => {
        store.dispatch(login({ username, password }));
        setLoginTrigger(true);
    }

    useEffect(() => {
        if(access_token && loginTrigger) {
            setLoginTrigger(false);
            navigate('/admin')
        }
    }, [access_token, navigate, loginTrigger])

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
                            <label className="label">
                                <span className="label-text text-white">Username</span>
                            </label>
                            <input
                                className='input input-bordered w-full max-w-xs inputField'
                                type="text"
                                name="username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder="Username"
                                required
                            />
                            <label className="label">
                                <span className="label-text text-white">Password</span>
                            </label>
                            <input
                                className='input input-bordered w-full max-w-xs inputField'
                                type="password"
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                        </form>
                        <button onClick={() => triggerLogin()} className="btn btn-primary justify-center mt-4 float-right" >
                            <span>{"Login"}</span>
                        </button>
                    </section>
                </section>
            </section>
        </div>
    );
}

export default LoginPage;
