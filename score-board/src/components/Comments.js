import axios from 'axios';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useState, useEffect, useContext, useCallback } from 'react';
import { SocketContext } from '../context/socket';

const style = {
  position: 'absolute',
  overflowY: 'scroll',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70vw',
  maxHeight: '500px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

async function getComments(id) {
  const { data } = await axios.get(
    `http://localhost:3000/api/v1/matches/${id}/comments`
  );

  return data;
}

export default function Comments({ open, setOpen, match }) {
  const socket = useContext(SocketContext);
  const handleClose = () => setOpen(false);
  const [comments, setComments] = useState([]);
  const addComment = useCallback(
    (comment) => {
      if (match.id === comment.match.id) {
        setComments([comment, ...comments]);
      }
    },
    [comments, match]
  );

  useEffect(() => {
    getComments(match.id).then((data) => setComments(data.reverse()));
  }, [match.id]);

  useEffect(() => {
    socket.on('comment', addComment);

    return () => {
      socket.off('comment', addComment);
    };
  }, [addComment, socket]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            {match.teamOne} - {match.teamTwo} ({match.scoreTeamOne} -{' '}
            {match.scoreTeamTwo})
          </Typography>

          <br />

          <Typography id="modal-modal-title" variant="h6" component="h2">
            Comments
          </Typography>

          {comments.map((comment) => {
            return (
              <Typography
                key={comment.id}
                id="modal-modal-description"
                sx={{ mt: 2 }}
              >
                {comment.description}
              </Typography>
            );
          })}
        </Box>
      </Modal>
    </div>
  );
}
