import React, { useState, useEffect, useRef } from "react";
// import * as faceapi from "@vladmandic/face-api";
import * as faceapi from "face-api.js";

const WebcamComponent = () => {
  // initiase states---
  const [initializing, setInitializing] = useState(true);
  const videoRef = useRef();
  const canvasRef = useRef();
  const videoHeight = 400;
  const videoWidth = 400;

  // loading video
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "./models"; // Update to the correct path
      setInitializing(true);
      Promise.all([
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      ]).then(startWebcam); // Start the webcam after the models are loaded
    };

    loadModels();

    // Clean up the stream when the component unmounts
    return () => {
      if (videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        // Now that the video has loaded metadata, we can initialize face detection
        setInitializing(false); // Set initializing to false after starting the video
      };
    } catch (error) {
      console.error("getUserMedia Error: ", error);
    }
  };

  const handleVideoPlay = () => {
    setInterval(async () => {
      if (initializing) {
        setInitializing(false);
      }
      canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
        videoRef.current
      );
      const displaySize = { width: videoWidth, height: videoHeight };
      faceapi.matchDimensions(canvasRef.current, displaySize);
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()) // Use tinyFaceDetectorOptions
        .withFaceLandmarks()
        .withFaceDescriptors();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      // Clear previous detections
      canvasRef.current
        .getContext("2d")
        .clearRect(0, 0, videoWidth, videoHeight);

      // Draw face detections on canvas
      faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
      console.log("detections", detections);
    }, 100);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 h-full bg-gray-200 p-4">
        <h2> {initializing ? "Wait" : "Go now"} </h2>
        <h2 className="text-2xl font-bold mb-4">Webcam Feed</h2>
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </div>
      <div className="w-1/2 h-full relative">
        <video
          ref={videoRef}
          className="h-full w-full object-cover p-2 rounded-xl"
          autoPlay
          playsInline
          onPlay={handleVideoPlay}
          muted
          height={videoHeight}
          width={videoWidth}
        />
      </div>
    </div>
  );
};

export default WebcamComponent;
