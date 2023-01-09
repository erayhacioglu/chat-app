import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Room = () => {
	const [room, setRoom] = useState('');
	const [username, setUsername] = useState('');

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (room && username) {
			navigate(`/chat?room=${room}&username=${username}`);
            setRoom('');
            setUsername('');
		}
	};

	return (
		<form
			className='w-full max-w-[450px] rounded bg-white py-10 px-7 space-y-5'
			onSubmit={handleSubmit}
		>
			<h2 className='text-center font-semibold text-3xl text-orange-600'>
				Chat
			</h2>
			<input
				placeholder='Room'
				className='w-full h-10 outline-none rounded border border-orange-500 p-2'
				value={room.toLocaleLowerCase('TR')}
				onChange={(e) => setRoom(e.target.value)}
			/>
			<input
				placeholder='Username'
				className='w-full h-10 outline-none rounded border border-orange-500 p-2'
				value={username.toLocaleLowerCase('TR')}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<button
				type='submit'
				className='w-full text-white rounded bg-orange-500 hover:opacity-70 transition-all py-2 cursor-pointer'
				disabled={room && username ? false : true}
			>
				Join Room
			</button>
		</form>
	);
};

export default Room;
