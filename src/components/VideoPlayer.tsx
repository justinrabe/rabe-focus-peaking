"use client"

import React, { useRef, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { applyFocusPeaking } from '../utils/focusPeaking';

interface VideoPlayerProps {
  videoSrc: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (video && canvas && context) {
      video.addEventListener('play', () => {
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
      });
    }
  }, [showOverlay]);

  return (
    <div>
        <Button onClick={() => setShowOverlay(!showOverlay)} variant="default" size="default">
            {showOverlay ? 'Hide Focus Peaking' : 'Show Focus Peaking'}
        </Button>
        <div style={{ position: 'relative', width: '640px', height: '360px' }}>
            <video ref={videoRef} src={videoSrc} width="640" height="360" controls />
            <canvas
                ref={canvasRef}
                width="640"
                height="360"
                style={{
                position: 'absolute',
                top: 0,
                left: 0,
                display: showOverlay ? 'block' : 'none',
                pointerEvents: 'none',
                backgroundColor: 'transparent',
                zIndex: 2
                }}
            />
        </div>
    </div>
    
  );
};

export default VideoPlayer;