import { Routes, Route } from 'react-router-dom';
import Room from './pages/Room';
import Chat from './pages/Chat';

const App = () => {
	return (
		<div className='h-[100vh] w-full bg-gray-300'>
			<div className='container mx-auto px-5 w-full h-full flex items-center justify-center'>
				<Routes>
					<Route path='/' element={<Room />} />
					<Route path='/chat' element={<Chat />} />
				</Routes>
			</div>
		</div>
	);
};

export default App;
