import axios from 'axios';
import Grid from '@mui/material/Grid';
import { useEffect, useState, useContext, useCallback } from 'react';
import Match from './Match';
import { SocketContext } from '../context/socket';

function MatchList() {
  const socket = useContext(SocketContext);
  const [matches, setMatches] = useState([]);

  const getMatches = async () => {
    const { data } = await axios.get('http://localhost:3000/api/v1/matches');

    return data;
  };

  const addMatch = useCallback(
    (match) => setMatches([...matches, match]),
    [matches]
  );

  const updateScore = useCallback(
    (match) => {
      let item = matches.find((el) => el.id === match.id);
      const index = matches.indexOf(item);

      for (const attr in match) {
        item[attr] = match[attr];
      }

      setMatches([
        ...matches.slice(0, index),
        item,
        ...matches.slice(index + 1),
      ]);
    },
    [matches]
  );

  useEffect(() => {
    getMatches().then((data) => setMatches(data));
  }, []);

  useEffect(() => {
    socket.on('newMatch', addMatch);
    socket.on('score', updateScore);

    return () => {
      socket.off('newMatch', addMatch);
      socket.off('score', updateScore);
    };
  }, [addMatch, socket, updateScore]);

  return (
    <Grid container spacing={2}>
      {matches.map((match) => (
        <Grid key={match.id} item md={4} xs={12}>
          <Match match={match} socket={socket} />
        </Grid>
      ))}
    </Grid>
  );
}

export default MatchList;
