import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reducers';
import { ActionTypes } from '../../../../redux/types/ActionTypes';
import { Call, CallEnd, Videocam } from '@material-ui/icons';
// import RingRing from '../../../../audio/ringring.mp3';
import {
  Avatar,
  Fade,
  IconButton,
  List,
  Paper,
  Typography,
} from '@material-ui/core';
import BaseModal from './base-model.component';
import './call-modal.styles.scss';
const CallModal = () => {
  const dispatch = useDispatch();
  const { call, peer, socket }: any = useSelector<RootState>((state) => state);
  const { userCurrent }: any = useSelector<RootState>((state) => state.user);
  const { chatWith }: any = useSelector<RootState>((state) => state.chat);
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const [answer, setAnswer] = useState(false);
  const youVideo = useRef<any>();
  const otherVideo = useRef<any>();
  const [tracks, setTracks] = useState<any>(null);
  const [newCall, setNewCall] = useState<any>(null);

  useEffect(() => {
    const setTime = () => {
      setTotal((t) => t + 1);
      setTimeout(setTime, 1000);
    };
    setTime();

    return () => setTotal(0);
  }, []);

  useEffect(() => {
    setSecond(total % 60);
    // setMins(parseInt(total / 60));
    // setHours(parseInt(total / 3600));
  }, [total]);

  const addCallMessage = useCallback(
    (call: any, times: any, disconnect: any) => {
      if (call.recipient !== userCurrent._id || disconnect) {
        // const data1 = getData(call.recipient,call.sender)
        //     const {member, _id} = data1
        // const data = {
        //   idConversation: chatWith.idConversation,
        //   sender: userCurrent._id,
        //   message: 'Call',
        //   type: 'CALL',
        // };
        // const data = {
        //   conversation: chatWith.idConversation,
        //   sender: auth.user,
        //   text: '',
        //   media: [],
        //   call: { video: call.video, times },
        // };
        // const member = currentConver.member;
        // dispatch(addMesage({ data, auth, socket, member }));
        // socket.emit('send_message', data);
      }
      // },[])
    },
    [dispatch, userCurrent, chatWith, socket]
  );

  const handleEndCall = () => {
    tracks && tracks.forEach((track: any) => track.stop());
    if (newCall) newCall.close();
    let times = answer ? total : 0;
    socket.emit('endCall', { ...call, times });

    // addCallMessage(call, times);
    dispatch({ type: ActionTypes.CALL, payload: null });
  };

  useEffect(() => {
    if (answer) {
      setTotal(0);
    } else {
      const timer = setTimeout(() => {
        socket.emit('endCall', { ...call, times: 0 });
        // addCallMessage(call, 0);
        dispatch({ type: ActionTypes.CALL, payload: null });
      }, 15000);

      return () => clearTimeout(timer);
    }
  }, [dispatch, answer, call, socket, addCallMessage]);

  useEffect(() => {
    socket.on('endCallToClient', (data: any) => {
      tracks && tracks.forEach((track: any) => track.stop());
      if (newCall) newCall.close();
      // addCallMessage(data, data.times);
      dispatch({ type: ActionTypes.CALL, payload: null });
    });

    return () => socket.off('endCallToClient');
  }, [socket, dispatch, tracks, addCallMessage, newCall]);

  // Stream Media
  const openStream = (video: any) => {
    const config = { audio: true, video };

    return navigator.mediaDevices.getUserMedia(config);
  };
  const playStream = (tag: any, stream: any) => {
    let video = tag;
    video.srcObject = stream;
    video.play();
  };

  // Answer Call
  const handleAnswer = () => {
    openStream(call.video).then((stream) => {
      playStream(youVideo.current, stream);
      const track = stream.getTracks();
      setTracks(track);

      const newCall = peer.call(call.peerId, stream);
      newCall.on('stream', function (remoteStream: any) {
        playStream(otherVideo.current, remoteStream);
      });
      setAnswer(true);
      setNewCall(newCall);
    });
  };

  useEffect(() => {
    peer.on('call', (newCall: any) => {
      openStream(call.video).then((stream) => {
        if (youVideo.current) {
          playStream(youVideo.current, stream);
        }
        const track = stream.getTracks();
        setTracks(track);

        newCall.answer(stream);
        newCall.on('stream', function (remoteStream: any) {
          if (otherVideo.current) {
            playStream(otherVideo.current, remoteStream);
          }
        });
        setAnswer(true);
        setNewCall(newCall);
      });
    });
    return () => peer.removeListener('call');
  }, [peer, call.video]);

  // Disconnect
  useEffect(() => {
    socket.on('callerDisconnect', () => {
      tracks && tracks.forEach((track: any) => track.stop());
      if (newCall) newCall.close();
      let times = answer ? total : 0;
      addCallMessage(call, times, true);

      dispatch({ type: ActionTypes.CALL, payload: null });

      // dispatch({
      //   type: GLOBALTYPES.ALERT,
      //   payload: { error: `The ${call.username} disconnect` },
      // });
    });

    return () => socket.off('callerDisconnect');
  }, [socket, tracks, dispatch, call, addCallMessage, answer, total, newCall]);

  // Play - Pause Audio
  const playAudio = (newAudio: any) => {
    newAudio.play();
  };

  const pauseAudio = (newAudio: any) => {
    newAudio.pause();
    newAudio.currentTime = 0;
  };

  useEffect(() => {
    let newAudio = new Audio('images/audio/ringring.mp3');
    if (answer) {
      pauseAudio(newAudio);
    } else {
      playAudio(newAudio);
    }

    return () => pauseAudio(newAudio);
  }, [answer]);

  const body = (
    <Fade in={true}>
      <Paper className="paper" id="modal-call">
        <div
          className="callBox"
          style={{
            display: answer && call.video ? 'none' : 'flex',
            padding: '1rem 0',
          }}
        >
          <Avatar
            src={call.profilePicture}
            alt="avatar-call"
            className="profilePicture"
          >
            {call.username.slice(0, 1)}
          </Avatar>
          <Typography component="h3">{call.username}</Typography>
          <Typography>{`Từ: ${userCurrent.name}`}</Typography>
          {answer ? (
            <div>
              <span>{hours.toString().length < 2 ? '0' + hours : hours}</span>
              <span>:</span>
              <span>{mins.toString().length < 2 ? '0' + mins : mins}</span>
              <span>:</span>
              <span>
                {second.toString().length < 2 ? '0' + second : second}
              </span>
            </div>
          ) : (
            <div>
              {call.video ? (
                <span style={{ color: 'red' }}>Calling Video...</span>
              ) : (
                <span style={{ color: 'red' }}>Calling Audio...</span>
              )}
            </div>
          )}
          {!answer && (
            <div className="timer">
              <small>{mins.toString().length < 2 ? '0' + mins : mins}</small>
              <small>:</small>
              <small>
                {second.toString().length < 2 ? '0' + second : second}
              </small>
            </div>
          )}
          <List component="nav" aria-label="nav-left" className="action">
            <IconButton onClick={() => handleEndCall()}>
              <CallEnd />
            </IconButton>
            {call.recipient === userCurrent._id && !answer && (
              <>
                {call.video ? (
                  <IconButton color="primary" onClick={() => handleAnswer()}>
                    {/* {call.recipient === auth.user._id && !answer && call.video? <Videocam/> : <Call/>} */}
                    <Videocam />
                  </IconButton>
                ) : (
                  <IconButton color="primary" onClick={() => handleAnswer()}>
                    <Call />
                  </IconButton>
                )}
              </>
            )}
          </List>
        </div>
        <div
          className="showVideo"
          style={{
            opacity: answer && call.video ? '1' : '0',
          }}
        >
          <video ref={youVideo} className="youVideo" playsInline muted />
          <video ref={otherVideo} className="otherVideo" playsInline />

          <div className="time_video">
            <span>{hours.toString().length < 2 ? '0' + hours : hours}</span>
            <span>:</span>
            <span>{mins.toString().length < 2 ? '0' + mins : mins}</span>
            <span>:</span>
            <span>{second.toString().length < 2 ? '0' + second : second}</span>
          </div>

          <IconButton onClick={() => handleEndCall()}>
            <CallEnd />
          </IconButton>
        </div>
      </Paper>
    </Fade>
  );

  return <BaseModal body={body} isShow={true} />;
};

export default CallModal;
