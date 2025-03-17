'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { applyFocusPeaking } from '../utils/focusPeaking';

const WebcamFocusPeaking: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 640, height: 360 });

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (video && canvas && context) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          video.srcObject = stream;
          video.play();
        })
        .catch((err) => {
          console.error('Error accessing webcam: ', err);
        });

      video.addEventListener('loadedmetadata', () => {
        setDimensions({
          width: video.videoWidth,
          height: video.videoHeight,
        });
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      });

      const drawFrame = () => {
        if (!video.paused && !video.ended) {
          context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          if (showOverlay) {
            applyFocusPeaking(context, canvas.width, canvas.height);
          }
          requestAnimationFrame(drawFrame);
        }
      };

      video.addEventListener('play', () => {
        requestAnimationFrame(drawFrame);
      });
    }
  }, [showOverlay]);

  return (
    <div>
      <Button
        onClick={() => setShowOverlay(!showOverlay)}
        variant="default"
        size="default"
      >
        {showOverlay ? 'Hide Focus Peaking' : 'Show Focus Peaking'}
      </Button>
      <div
        style={{
          position: 'relative',
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
        }}
      >
        <video
          ref={videoRef}
          width={dimensions.width}
          height={dimensions.height}
          autoPlay
          muted
          style={{ zIndex: 1 }}
        />
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            display: showOverlay ? 'block' : 'none',
            pointerEvents: 'none',
            backgroundColor: 'transparent',
            zIndex: 2,
          }}
        />
      </div>
    </div>
  );
};

export default WebcamFocusPeaking;
