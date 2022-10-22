import { Link, useLocation } from 'react-router-dom';
import styles from './GameOverPage.module.scss';

function GameOverPage() {
    const { state } = useLocation();

    return (
        <div className="overflow-auto HideScrollbars inline-block relative min-w-full min-h-fit h-full object-cover">
            <section className="pt-16 h-fit" data-testid="GameOverPage" >
                <div className="text-white h-fit HideScrollbars">
                    <section className="LinkTopContainer">
                        <Link to="/" className='LinkTop'>
                            <span>{"< home"}</span>
                        </Link>
                    </section>
                    <h1 className={styles.HeaderText}>
                        Game over
                    </h1>
                    <h3 className={styles.PointsText}>
                        {state.points} points
                    </h3>
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

export default GameOverPage;
