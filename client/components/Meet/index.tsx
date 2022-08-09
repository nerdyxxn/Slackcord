import React, { useEffect, useRef } from 'react';

const Meet = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    getUserMedia();
  }, []);

  const getUserMedia = () => {
    const constraints = {
      audio: false,
      video: true,
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        //display video
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((e) => {
        console.log('error ::::::::::::: ', e);
      });
  };
  return (
    <div>
      <video ref={videoRef} autoPlay></video>
    </div>
  );
};

export default Meet;
