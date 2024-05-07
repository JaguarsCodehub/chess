## Backend Architecture: Beginning

We are building a basic foundation before implementing the Chess.js library in our project

### What our foundation looks like ?

**Basic Websocket Server**

```Typescript
import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';

const wss = new WebSocketServer({ port: 8080 });

const gameManager = new GameManager();

wss.on('connection', function connection(ws) {
  gameManager.addUser(ws);

  ws.on('disconnect', () => gameManager.removeUser(ws));
});

```

**Game Class with all the parameters**

```Typescript
import { WebSocket } from 'ws';

export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  private board: string;
  private moves: string[];
  private startTime: Date;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = 'pppppp';
    this.moves = [];
    this.startTime = new Date();
  }

  makeMove(socket: WebSocket, move: string) {
    // validation of moves
    // Is it the users move



    // Update the board
    // Push the move

    // Check if the game is over

    // Send the update board to both players

  }
}

```

**GameManager that's responsible for managing the Game and Socket Events**

```Typescript
import { WebSocket } from 'ws';
import { INIT_GAME, MOVE } from './messages';
import { Game } from './Game';

interface GameInterface {
  id: number;
  name: string;
  player1: string;
  player2: string;
}

export class GameManager {
  private games: GameInterface[];
  private pendingUser: WebSocket | null;
  private users: WebSocket[];

  constructor() {
    this.games = [];
    this.pendingUser = null;
    this.users = [];
  }

  addUser(socket: WebSocket) {
    this.users.push(socket);
    this.addHandler(socket);
  }
  removeUser(socket: WebSocket) {
    this.users = this.users.filter((user) => user !== socket);
    // This Logic is not great, shoul have some reconnect logic for the user
  }

  private addHandler(socket: WebSocket) {
    socket.on('message', (data) => {
      const message = JSON.parse(data.toString());

      if (message.type === INIT_GAME) {
        if (this.pendingUser) {
          // start a game
          const game = new Game(this.pendingUser, socket);
          this.games.push(game);
          this.pendingUser = null;
        } else {
          this.pendingUser = socket;
        }
      }

      if (message.type === MOVE) {
        const game = this.games.find(
          (game) => game.player1 === socket || game.player2 === socket
        );
        if (game) {
          game.makeMove(socket, message.move);
        }
      }
    });
  }
}

```
