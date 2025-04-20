import { io } from 'socket.io-client';

const socket = io('https://khsol-nest.onrender.com'); // შენი სერვერის URL

export default socket;