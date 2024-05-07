import { Button } from '../components/Button';
import { Chessboard } from '../components/Chessboard';
import { useSocket } from '../components/hooks/useSocket';
import { GAME_OVER, INIT_GAME, MOVE } from '../constants/messages';
import { useEffect, useState } from 'react';
import { Chess } from 'chess.js';

const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case INIT_GAME:
          setBoard(chess.board());
          setStarted(true)
          console.log('Game Initialised');
          break;
        case MOVE: {
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          console.log('Move Made');
          break;
        }

        case GAME_OVER:
          console.log('Game OVer');
          break;
      }
    };
  }, [socket]);

  if (!socket) return <div>Connecting ... Might take some time</div>;

  return (
    <div className='justify-center flex'>
      <div className='pt-8 max-w-screen-lg w-full'>
        <div className='grid grid-cols-6 gap-4 w-full'>
          <div className='col-span-4 w-full flex justify-center'>
            <Chessboard
              chess={chess}
              setBoard={setBoard}
              board={board}
              socket={socket}
            />
          </div>
          <div className='col-span-2 bg-zinc-900 w-full flex justify-center'>
            <div className='pt-20'>
              {!started && <Button
                onClick={() =>
                  socket?.send(
                    JSON.stringify({
                      type: INIT_GAME,
                    })
                  )
                }
              >
                Play
              </Button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
