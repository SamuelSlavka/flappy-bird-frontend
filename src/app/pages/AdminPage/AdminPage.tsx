import { Link } from 'react-router-dom';
import store from '../../store';
import { logout } from '../LoginPage/store/loginSlice';
import styles from './AdminPage.module.scss';

function AdminPage() {
    const triggerLogout = () => {
        store.dispatch(logout());
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
                    <h1 className={styles.HeaderText}>
                        AdminPage
                    </h1>

                    <button onClick={() => triggerLogout()} className="justify-center w-full" >
                            <h3 className={`${styles.PointsText} mt-6`}>
                                <span>{"Logout"}</span>
                            </h3>
                        </button>
                </div>
            </section>
        </div>
    );
}

export default AdminPage;
