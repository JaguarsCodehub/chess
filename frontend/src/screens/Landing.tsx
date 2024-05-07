import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className=''>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div className='flex justify-center mt-20'>
            <img src={'/chessboard.png'} className='max-w-xl' alt='' />
          </div>
          <div className='p-20 justify-center'>
            <h1 className='text-7xl leading-tight font-bold text-lime-600'>
              Play Chess online on the #1 site
            </h1>
            <p className='mt-6 text-2xl text-white'>
              Play chess with your friends
            </p>

            <div className='mt-4'>
              <Button onClick={() => navigate('/game')}>Play Online</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
