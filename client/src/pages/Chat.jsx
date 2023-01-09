import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000');

const Chat = () => {
	const [message, setMessage] = useState('');
	const [messageList, setMessageList] = useState([]);

	const [searchParams] = useSearchParams();

	const room = searchParams.get('room');
	const username = searchParams.get('username');

	useEffect(() => {
		if (room && username) {
			socket.emit('room', room);
		}
	}, []);

	useEffect(() => {
		socket.on('messageList', (data) => {
			setMessageList((prev) => [...prev, data]);
		});
	}, [socket]);

	const sendMessage = async (e) => {
		e.preventDefault();
		const messageContent = {
			room,
			username,
			message,
			date:
				new Date(Date.now()).getHours() +
				':' +
				new Date(Date.now()).getMinutes(),
		};
		await socket.emit('message', messageContent);
		setMessageList((prev) => [...prev, messageContent]);
		setMessage('');
	};

	return (
		<div className='w-[600px] h-[90vh] bg-white border border-orange-500 rounded overflow-hidden'>
			<div className='w-full h-[13%] bg-orange-400 flex items-center px-3'>
				<h2 className='text-white text-xl'>{room}</h2>
			</div>
			<div className='w-full h-[77%]  overflow-auto py-3 px-2'>
				{messageList?.map((item, key) => (
					<div
						key={key}
						className={`rounded-lg p-2 w-1/2 min-h-[50px] ${
							username === item.username
								? 'ml-auto mt-5 rounded-br-none bg-orange-300 text-orange-600'
								: 'rounded-tl-none mb-5 last:mb-0 bg-orange-400 text-white'
						} `}
					>
						{item.message}
						<div className='text-right'>
							{item.username} - {item.date}
						</div>
					</div>
				))}
			</div>
			<form
				onSubmit={sendMessage}
				className='w-full h-[10%] border-t border-orange-500'
			>
				<input
					className='w-3/4 h-full p-2 outline-none'
					placeholder='message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button className='w-1/4 h-full text-white bg-orange-500'>Send</button>
			</form>
		</div>
	);
};

export default Chat;
