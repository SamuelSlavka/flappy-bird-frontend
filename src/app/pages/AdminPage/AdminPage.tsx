import { Link } from 'react-router-dom';
import styles from './AdminPage.module.scss';

function AdminPage() {

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
                    <Link to="/game">
                        <h3 className={styles.PointsText}>
                        <span>{"Again"}</span>
                        </h3>
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default AdminPage;
