# wumpus_sv

The Wumpus world is a simple world example to illustrate the worth of a knowledge-based agent and to represent knowledge representation. It was inspired by a video game Hunt the Wumpus by Gregory Yob in 1973.

This is the core game to implement an agent for in the future.

![](img/intro.page)

#### There are also some components which can help the agent to navigate the cave. These components are given as follows:

The rooms adjacent to the Wumpus room are smelly, so that it would have some stench.

The room adjacent to PITs has a breeze, so if the agent reaches near to PIT, then he will perceive the breeze.

There will be glitter in the room if and only if the room has gold.

The Wumpus can be killed by the agent if the agent is facing to it, and Wumpus will emit a horrible scream which can be heard anywhere in the cave.

#### PEAS description of Wumpus world:

Performance measure:

+1000 reward points if the agent comes out of the cave with the gold.

-1000 points penalty for being eaten by the Wumpus or falling into the pit.

-1 for each action, and -10 for using an arrow.

The game ends if either agent dies or came out of the cave.

## Game Features

![](img/home.page)

Player Mode: Player is able to play and replay the game

AI Mode: AI explore the Map 

Player vs. AI Mode: Player compete with AI to see who can get higher score

## Low Level Details

### FrontEnd
3 html files, 1 css files and bootstrap

index.html --- home page

game.html --- player mode

ai.html --- AI mode

### BackEnd

Object oriented design

NodeJS

Express --- send html to players

P5.js --- p5.js is a JavaScript library, mainly used to sketch and provides sound for the game by using setup(), restart(), draw()
sound.play() etc.

