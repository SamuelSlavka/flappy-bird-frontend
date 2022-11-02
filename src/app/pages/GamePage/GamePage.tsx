// MatterStepOne.js
import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { ColorScheme } from '../../enums/ColorScheme';
import { Link } from 'react-router-dom';
import { handleSingleKeypress } from './utils/input_handling';
import { handleResize } from './utils/resize_handling';
import { Constants, GameStages } from './enums/gameConstants';
import { getBody } from './utils/matterjs_utils';
import { body_config, obstacle_config, player_config } from './utils/body_utils';
import { useNavigate } from "react-router-dom";

var clock = 1;
var clickedUp = false;

const inputListener = (e: any) => {
  clickedUp = true;
}

var render: Matter.Render | undefined;
var engine: Matter.Engine | undefined;
var runner: Matter.Runner | undefined;

const Engine = Matter.Engine;
const Render = Matter.Render;
const Runner = Matter.Runner;
const Composite = Matter.Composite;
const Events = Matter.Events;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

const GamePage = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [constraints, setConstraints] = useState<DOMRect>();
  const [points, setPoints] = useState<number>(0);
  const [events, setEvents] = useState<boolean>(false);
  const [gameStage, setGameStage] = useState<GameStages>(GameStages.START);

  const navigate = useNavigate();

  // Matter setup
  useEffect(() => {
    const bounds = boxRef?.current?.getBoundingClientRect();
    setConstraints(bounds);
    // create engine 
    if (!engine) {
      engine = Engine.create({ gravity: { x: 0, y: 0 } });
    }

    render = Render.create({
      element: boxRef.current ?? undefined,
      engine: engine,
      canvas: canvasRef.current ?? undefined,
      options: {
        background: ColorScheme.black,
        wireframes: false
      }
    });

    Render.run(render);

    // create runner
    if (!runner) {
      runner = Runner.create();
    }
    Runner.run(runner, engine);

    const floor = Bodies.rectangle(0, 0, 0, 200, body_config('floor'));
    const ceiling = Bodies.rectangle(0, 0, 0, 200, body_config('ceiling'));
    const leftWall = Bodies.rectangle(0, 0, 0, 200, body_config('leftWall'));
    const rightWall = Bodies.rectangle(0, 0, 0, 200, body_config('rightWall'));

    const boundX = ((bounds?.width ?? 200) / 4);
    const boundY = ((bounds?.height ?? 200) / 2);

    const player = Bodies.circle(boundX, (boundY), Constants.PARTICLE_SIZE, player_config('player'));
    const elementsComposite = Composite.create({ label: 'elements' });

    Composite.add(elementsComposite, [floor, ceiling, leftWall, rightWall, player])
    Composite.add(engine.world, [elementsComposite]);

    // trigger one time event setup
    setEvents(false);

  }, []);

  // cleanup
  useEffect(() => {
    return () => {
      if (render && engine && runner) {
        Matter.World.clear(engine.world, false);
        Composite.clear(engine.world, false, true);
        Matter.Engine.clear(engine);

        Render.stop(render);
        Runner.stop(runner);
        window.removeEventListener('keydown', inputListener);
        window.removeEventListener('touchstart', inputListener);
        window.onresize = null;
      }
    }
  }, [])

  useEffect(() => {
    if (engine) {
      const localEngine: Matter.Engine = engine;
      const tickCallback = () => {
        tickFunciton(localEngine, constraints, gameStage)
      }
      const collisionCallback = (event: Matter.IEventCollision<Matter.Engine>) => {
        collistionFunction(event, localEngine, points)
      }
      // remove all previous events
      Events.off(engine, '', () => { });
      Events.off(runner, '', () => { });
      // renew events with new boundaries
      Events.on(engine, 'collisionStart', collisionCallback);
      Events.on(runner, 'afterTick', tickCallback);

      window.onresize = () => {
        const bounds = boxRef?.current?.getBoundingClientRect();
        setConstraints(bounds);
      }

      // handle input
      window.addEventListener('keydown', inputListener);
      window.addEventListener('touchstart', inputListener, false);
      setEvents(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events, constraints, gameStage, points]);


  const collistionFunction = (
    event: Matter.IEventCollision<Matter.Engine>,
    engine: Matter.Engine,
    points: number
  ) => {
    var pairs = event.pairs;
    for (var i = 0, j = pairs.length; i !== j; ++i) {
      var pair = pairs[i];
      const obstacle = pair.bodyB.label === 'obstacle' || pair.bodyA.label === 'obstacle';
      const player = pair.bodyB.label === 'player' || pair.bodyA.label === 'player';
      const leftWall = pair.bodyB.label === 'leftWall' || pair.bodyA.label === 'leftWall';
      if (obstacle && leftWall) {
        const obstacleBody = pair.bodyA.label === 'obstacle' ? pair.bodyA : pair.bodyB;
        Matter.Composite.remove(engine.world, obstacleBody)
        setPoints((points) => points + 1)
      }
      if (obstacle && player) {
        setGameStage(GameStages.END);
        console.log('game over');
        navigate('/game-over', { state: { points: points } });
      }
    }
  }


  const tickFunciton = (engine: Matter.Engine, constraints: DOMRect | undefined, gameStage: GameStages) => {
    const player = getBody(engine.world.composites, 'elements', 'player');
    const bounds = boxRef?.current?.getBoundingClientRect();

    switch (gameStage) {
      case GameStages.START:
        if (clickedUp) {
          setGameStage(GameStages.PLAY);
        }
        break;

      case GameStages.END:
        clickedUp = false;
        break;

      case GameStages.PLAY:
        clock += 1;
        if (player) {
          // handle player input
          const { x, y } = handleSingleKeypress(clickedUp, player);
          clickedUp = false;

          Body.setVelocity(player, {
            x: Math.min((x), 50),
            y: (Math.max((y), -30) + 0.6) * 1.08
          });
          // handle player bounds
          if (bounds) {
            if (player.position.x > bounds.width + 20 || player.position.x < -20 ||
              player.position.y > bounds.height + 20 || player.position.y < -20) {
              Body.setPosition(player, { x: 100, y: 100 });
              Body.setVelocity(player, { x: 0, y: 0 });
            }
          }
        }

        var speed = 120;
        var obstructinSpaces = 200;

        // main game loop
        if (!(clock % speed)) {
          // add obstacle
          if (constraints && engine) {
            let { height, width } = constraints;
            const playHeight = Math.min(height, 800);
            const playMargins = (height - playHeight)/2
            let randomY = Math.floor(Math.random() * ((Math.min(playHeight, 800) - 40 - playMargins - obstructinSpaces))) + 40 + playMargins;
            const spacer = (randomY) + obstructinSpaces;
            const bottomHeight = height - spacer;

            const obstacleTop = Bodies.rectangle(width - 10, randomY / 2, 40, randomY, obstacle_config);
            const obstacleBottom = Bodies.rectangle(width - 10, spacer + bottomHeight / 2, 40, bottomHeight, obstacle_config);

            Composite.add(engine.world, obstacleTop);
            Composite.add(engine.world, obstacleBottom);
            Body.setVelocity(obstacleTop, { x: -5, y: 0 });
            Body.setVelocity(obstacleBottom, { x: -5, y: 0 });
          }
        }
        break;
    }
  }

  // update floor controller and scene size on resize
  useEffect(() => {
    if (constraints && render && engine) {
      // Update floor and scene size
      handleResize(render, engine, constraints, Body);
    }
  }, [constraints]);

  return (
    <div
      data-testid="GamePage"
      ref={boxRef}
      style={{
        width: '100%',
        height: '100%'
      }}
      className="bg-black"
      onClick={() => setGameStage(GameStages.PLAY)}
    >
      {gameStage !== GameStages.PLAY ?
        <>
          <section className="LinkTopContainer">
            <section className="min-w-fit mr-4">
              <a href="https://gitlab.com/SamuelSlavka/game">
                <span className='LinkTop'>{"git repo"}</span>
              </a>
            </section>
            <section className="min-w-fit mr-2">
              <Link to="/admin" className='LinkTop'>
                <span>{"admin"}</span>
              </Link>
            </section>
          </section>
          <section className='grid h-full'>
            <section className="place-self-center w-fit">
              <section className="pt-24 text-center text-l font-bold hover:text-light ease-in-out duration-200">
                <p className='mb-8 text-2xl'>Press anything to start </p>
                <p className='mb-2'> controll with keyboad/touchscreen </p>
                <p> roof and floor bounce!! </p>
              </section>
            </section>
          </section>
          </>
        :
        <></>
      }

      <section className='LinkTopContainer AlignLeft' >
        {`points: ${points}`}
      </section>

      <canvas ref={canvasRef} />
    </div>
  );
};

export default GamePage;