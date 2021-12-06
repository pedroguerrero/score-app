import Box from '@mui/material/Box';
import MatchList from './MatchList';
import { SocketContext, socket } from '../context/socket';

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <Box sx={{ flexGrow: 1 }}>
        <MatchList />
      </Box>
    </SocketContext.Provider>
  );
}

export default App;
