// MatterStepOne.js
import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { ColorScheme } from '../../enums/ColorScheme';
import { Link } from 'react-router-dom';
import { addListeners, handleKeypress } from './utils/input_handling';
import { handleResize } from './utils/resize_handling';
import { Constants } from './enums/gameConstants';
import { getBody } from './utils/matterjs_utils';
import { body_config, bullet_config, meteor_config, player_config } from './utils/body_utils';

var keyMap: { [id: string]: any } = {};

const GamePage = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [constraints, setConstraints] = useState<DOMRect>();
  const [scene, setScene] = useState<any>();
  const [runner, setRunner] = useState<any>();
  const [points, setPoints] = useState<number>(0);

  // Matter setup
  useEffect(() => {
    const bounds = boxRef?.current?.getBoundingClientRect();
    setConstraints(bounds);
    addListeners(keyMap);

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

    const boundX = ((bounds?.width ?? 200) / 2);
    const boundY = ((bounds?.height ?? 200) / 1.2);

    const player = Matter.Bodies.circle(boundX, (boundY - 150), Constants.PARTICLE_SIZE, player_config('player'));
    const elementsComposite = Matter.Composite.create({ label: 'elements' });

    Matter.Composite.add(elementsComposite, [floor, ceiling, leftWall, rightWall, player])
    Matter.Composite.add(world, [elementsComposite]);
    Matter.Render.run(render);

    // collision handling
    Matter.Events.on(engine, 'collisionStart', function (event) {
      var pairs = event.pairs;
      for (var i = 0, j = pairs.length; i !== j; ++i) {
        var pair = pairs[i];
        const bullet = pair.bodyB.label === 'bullet' || pair.bodyA.label === 'bullet';
        const meteor = pair.bodyB.label === 'meteor' || pair.bodyA.label === 'meteor';
        const player = pair.bodyB.label === 'player' || pair.bodyA.label === 'player';
        const floor = pair.bodyB.label === 'floor' || pair.bodyA.label === 'floor';
        if (bullet) {
          const bulletBody = pair.bodyA.label === 'bullet' ? pair.bodyA : pair.bodyB;
          Matter.Composite.remove(engine.world, bulletBody)
        }
        if (meteor) {
          const meteorBody = pair.bodyA.label === 'meteor' ? pair.bodyA : pair.bodyB;
          Matter.Composite.remove(engine.world, meteorBody)
        }
        if (meteor && bullet) {
          setPoints((points) => points + 2)
        }
        if (meteor && floor) {
          setPoints((points) => points - 1)
        }
        if (meteor && player) {
          console.log('game over')
        }
      }
    });

    // main game loop
    Matter.Events.on(runner, 'afterTick', function (event) {
      const player = getBody(world.composites, 'elements', 'player');
      if (player) {
        const { x, y } = handleKeypress(keyMap, player);

        Matter.Body.setVelocity(player, {
          x: Math.min((x), 50),
          y: (Math.min((y), 50) + 0.6) * 1.08
        });

        const bounds = boxRef?.current?.getBoundingClientRect();
        if (bounds) {
          if (player.position.x > bounds.width || player.position.x < 0 ||
            player.position.y > bounds.height || player.position.y < 0) {
            Matter.Body.setPosition(player, { x: 100, y: 100 });
            Matter.Body.setVelocity(player, { x: 0, y: 0 });
          }
        }
      }
    })

    setRunner(runner);
    setScene(render);
  }, []);

  // main game loop
  useEffect(() => {
    console.log('aa')
    if (runner) {
      var clock = 0;
      Matter?.Events?.on(runner, 'afterTick', function (event) {
        clock += 1;
        if (!(clock % 50)) {
          if (constraints && scene) {
            let { width } = constraints;
            let randomX = Math.floor(Math.random() * -width) + width;
            let size = Math.floor(Math.random() * 10) + 10;
      
            const obstacle = Matter.Bodies.circle(randomX, 30, size, meteor_config);
      
            Matter.World.add(
              scene.engine.world,
              obstacle
            );
      
            Matter.Body.setVelocity(obstacle, { x: 0, y: 10 });
          }
        }
      })
    }
  }, [runner, constraints, scene]);

  // initial setup
  useEffect(() => {
    window.onresize = () => {
      const bounds = boxRef?.current?.getBoundingClientRect();
      setConstraints(bounds);
    }
  }, []);

  // update floor controller and scene size on resize
  useEffect(() => {
    if (constraints && scene) {
      // Update floor and scene size
      handleResize(scene, constraints);
    }
  }, [scene, constraints]);

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