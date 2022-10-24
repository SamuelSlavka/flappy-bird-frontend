import NavItem from "./components/NavItem/NavItem";
import { Link } from "react-router-dom";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import styles from './HomePage.module.scss';

function HomePage() {

    return (
        <div className="overflow-auto HideScrollbars inline-block relative min-w-full min-h-fit h-full object-cover">
            <section className="pt-16 h-fit" data-testid="HomePage" >
                <div className="text-white h-fit HideScrollbars">
                    <section className="LinkTopContainer">
                        <a href="https://gitlab.com/SamuelSlavka/game">
                            <span className='LinkTop'>{"git repo"}</span>
                        </a>
                    </section>
                    <section className="LinkTopContainer AlignLeft">
                        <Link to="/admin" className='LinkTop'>
                            <span>{"admin"}</span>
                        </Link>
                    </section>
                    <h1 className={styles.HeaderText}>
                        Hello there
                    </h1>
                    <div className="mt-8 mb-6 md:mt-16 lg:mt-32 text-center flex w-100 flex-wrap justify-center">
                        <Link to="/game">
                            <NavItem name="Play" icon={solid("play")} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePage;
