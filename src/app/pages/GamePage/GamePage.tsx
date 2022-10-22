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
  if (e.code === 'Space' || e.code === 'KeyW') {
    clickedUp = true;
  }
}

const GamePage = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [constraints, setConstraints] = useState<DOMRect>();
  const [render, setRender] = useState<Matter.Render>();
  const [engine, setEngine] = useState<Matter.Engine>();
  const [runner, setRunner] = useState<Matter.Runner>();
  const [points, setPoints] = useState<number>(0);
  const [events, setEvents] = useState<boolean>(false);
  const [gameStage, setGameStage] = useState<GameStages>(GameStages.PLAY);

  const navigate = useNavigate();

  // Matter setup
  useEffect(() => {
    const bounds = boxRef?.current?.getBoundingClientRect();
    setConstraints(bounds);

    // disable gravity
    const engine = Matter.Engine.create({ gravity: { x: 0, y: 0 } });
    const world = engine.world;

    const render = Matter.Render.create({
      element: boxRef.current ?? undefined,
      engine: engine,
      canvas: canvasRef.current ?? undefined,
      options: {
        background: ColorScheme.black,
        wireframes: false
      }
    });

    Matter.Render.run(render);

    // create runner
    var runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    const floor = Matter.Bodies.rectangle(0, 0, 0, 200, body_config('floor'));
    const ceiling = Matter.Bodies.rectangle(0, 0, 0, 200, body_config('ceiling'));
    const leftWall = Matter.Bodies.rectangle(0, 0, 0, 200, body_config('leftWall'));
    const rightWall = Matter.Bodies.rectangle(0, 0, 0, 200, body_config('rightWall'));

    const boundX = ((bounds?.width ?? 200) / 4);
    const boundY = ((bounds?.height ?? 200) / 2);

    const player = Matter.Bodies.circle(boundX, (boundY), Constants.PARTICLE_SIZE, player_config('player'));
    const elementsComposite = Matter.Composite.create({ label: 'elements' });

    Matter.Composite.add(elementsComposite, [floor, ceiling, leftWall, rightWall, player])
    Matter.Composite.add(world, [elementsComposite]);
    Matter.Render.run(render);

    setRunner(runner);
    setRender(render);
    setEngine(engine);
    // trigger one time event setup
    setEvents(false);
  }, []);

  // cleanup
  useEffect(() => {
    return () => {
      if(render && engine && runner) {
        window.removeEventListener('keydown', inputListener);
        Matter.Render.stop(render);
        Matter.Composite.clear(engine.world, false, true);
        Matter.Engine.clear(engine);
        Matter.Runner.stop(runner);
        render.canvas.remove();
        window.onresize = null;
        setRender(undefined);
        setEngine(undefined);
        setRunner(undefined);
      }
    }
  },[render, engine, runner])

  useEffect(() => {
    if (engine) {
      const tickCallback = () => {
        tickFunciton(engine, constraints, gameStage)
      }
      const collisionCallback = (event: Matter.IEventCollision<Matter.Engine>) => {
        collistionFunction(event, engine, points)
      }
      // remove all previous events
      Matter.Events.off(engine, '', () => { });
      Matter.Events.off(runner, '', () => { });
      // renew events with new boundaries
      Matter.Events.on(engine, 'collisionStart', collisionCallback);
      Matter.Events.on(runner, 'afterTick', tickCallback);

      window.onresize = () => {
        const bounds = boxRef?.current?.getBoundingClientRect();
        setConstraints(bounds);
      }
      // handle input
      window.addEventListener('keydown', inputListener);
      setEvents(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events, runner, constraints, engine, gameStage, points]);


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
        break;

      case GameStages.END:
        break;

      case GameStages.PLAY:
        clock += 1;
        if (player) {
          // handle player input
          const { x, y } = handleSingleKeypress(clickedUp, player);
          clickedUp = false;

          Matter.Body.setVelocity(player, {
            x: Math.min((x), 50),
            y: (Math.max((y), -30) + 0.6) * 1.08
          });
          // handle player bounds
          if (bounds) {
            if (player.position.x > bounds.width + 20 || player.position.x < -20 ||
              player.position.y > bounds.height + 20 || player.position.y < -20) {
              Matter.Body.setPosition(player, { x: 100, y: 100 });
              Matter.Body.setVelocity(player, { x: 0, y: 0 });
            }
          }
        }

        var speed = 100;
        var obstructinSpaces = 200;

        // main game loop
        if (!(clock % speed)) {
          // add obstacle
          if (constraints && engine) {
            let { height, width } = constraints;
            let randomY = Math.floor(Math.random() * ((height - 40 - obstructinSpaces))) + 40;
            const spacer = (randomY) + obstructinSpaces;
            const bottomHeight = height - spacer;

            const obstacleTop = Matter.Bodies.rectangle(width - 10, randomY / 2, 40, randomY, obstacle_config);
            const obstacleBottom = Matter.Bodies.rectangle(width - 10, spacer + bottomHeight / 2, 40, bottomHeight, obstacle_config);

            Matter.Composite.add(engine.world, obstacleTop);
            Matter.Composite.add(engine.world, obstacleBottom);
            Matter.Body.setVelocity(obstacleTop, { x: -5, y: 0 });
            Matter.Body.setVelocity(obstacleBottom, { x: -5, y: 0 });
          }
        }
        break;
    }
  }

  // update floor controller and scene size on resize
  useEffect(() => {
    if (constraints && render && engine) {
      // Update floor and scene size
      handleResize(render, engine, constraints);
    }
  }, [render, constraints, engine]);

  return (
    <div
      data-testid="GamePage"
      ref={boxRef}
      style={{
        width: '100%',
        height: '100%'
      }}
      className="bg-black"
    >
      <section className="LinkTopContainer">
        <Link to="/" className='LinkTop'>
          <span>{"< home"}</span>
        </Link>
      </section>

      <section className='LinkTopContainer AlignLeft' >
        {`points: ${points}`}
      </section>

      <canvas ref={canvasRef} />
    </div>
  );
};

export default GamePage;