/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import Matter from 'matter-js';
import { GameEngine } from 'react-native-game-engine'
import Box from './box';
import {
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { ensureActualIsNumber } from 'jest-matcher-utils';

const { width, height } = Dimensions.get('screen');
class App extends Component {
  render() {
    console.disableYellowBox = true;
    console.log('body', initialBox)

    // Physics 
    const engine = Matter.Engine.create({ enableSleeping: false });
    const world = engine.world;

    const boxSize = 100;
    const initialBox = Matter.Bodies.rectangle(width / 2, height / 2, boxSize, boxSize);
    const floor = Matter.Bodies.rectangle(width / 2, height - (boxSize - 20) / 2, width, boxSize, { isStatic: true });


    Matter.World.add(world, [initialBox, floor]);
    const Physics = (entities, { time }) => {
      let engine = entities['physics'].engine;
      Matter.Engine.update(engine, time.delta);
      return entities;
    }

    let boxIds = 0;
    const CreateBox = (entities, { touches, screen }) => {
      //let world = entities["physics"].world;

      let boxSize = Math.trunc(Math.max(screen.width, screen.height) * 0.075);

      touches.filter(t => t.type === "press").forEach(t => {
        let body = Matter.Bodies.rectangle(
          t.event.pageX, t.event.pageY,
          boxSize, boxSize,
          // { frictionAir: 0.021 }
        );

        Matter.World.add(world, [body]);
        entities[++boxIds] = {
          body: body,
          size: [boxSize, boxSize],
          color: boxIds % 2 == 0 ? "pink" : "#B8E986",
          renderer: Box
        };
      });

      return entities;
    };

    return (
      <GameEngine
        styles={styles.container}
        systems={[Physics, CreateBox,]}
        entities={{
          physics: { engine: engine, world: world },
          initialBox: {
            body: initialBox,
            size: [boxSize, boxSize],
            color: 'red',
            renderer: Box,
          },

          floor: {
            body: floor,
            size: [width, boxSize - 20],
            color: 'green',
            renderer: Box,
          }
        }}>
        <StatusBar hidden={true} />
      </GameEngine>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
