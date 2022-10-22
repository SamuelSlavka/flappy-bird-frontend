import NavItem from "./components/NavItem/NavItem";
import { Link } from "react-router-dom";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Time from "./components/Time/Time";

import styles from './HomePage.module.scss';
import { useEffect, useState } from "react";

function HomePage() {
    const [img, setImg] = useState<HTMLImageElement | undefined>(undefined);
    const [loadFail, setLoadFail] = useState<boolean>(false);


    useEffect(() => {
        const randomNumber = Math.floor(Math.random() * 6);
        const imageUrl = `/images/${randomNumber}.gif`;

        const loadImg = new Image()
        loadImg.src = imageUrl;
        // eager loading bg immage
        loadImg.onload = () => {
            setImg(loadImg);
            setLoadFail(false);
        }
        loadImg.onerror = () => {
            setLoadFail(true);
        }
    }, [])

    return (
        <>
            { loadFail ? <></> :
                <img className="pointer-events-none absolute min-w-full min-h-fit h-full -z-50 object-cover bg-black" src={img?.src} alt="idk" /> 
            }
            {img ?
                (<div className="overflow-auto HideScrollbars inline-block relative min-w-full min-h-fit h-full object-cover">

                    <section className="pt-16 h-fit" data-testid="HomePage" >
                        <div className="text-white h-fit HideScrollbars">
                            <section className="LinkTopContainer">
                                <a href="https://gitlab.com/SamuelSlavka/site">
                                    <span className='LinkTop'>{"git repo"}</span>
                                </a>
                            </section>
                            <h1 className={styles.HeaderText}>
                                Hello there
                            </h1>
                            <Time />
                            <div className="mt-8 mb-6 md:mt-16 lg:mt-32 text-center flex w-100 flex-wrap justify-center">
                                <Link to="/game">
                                    <NavItem name="Game" icon={solid("bowl-food")} />
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>)
                :
                (<section className="bg-black text-white min-h-full" data-testid="HomePage" >
                    <img className="text-center pt-28 m-auto" src={require('../../assets/ring-resize.svg').default} alt='mySvgImage' />     
                </section>)
            }
        </>
    );
}

export default HomePage;
