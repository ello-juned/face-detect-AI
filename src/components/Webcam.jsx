import React, { useState, useEffect, useRef } from "react";
import * as faceapi from "@vladmandic/face-api";

const WebcamComponent = () => {
  const [stream, setStream] = useState(null);

  const [initializing, setInitializing] = useState(true);
  const videoRef = useRef();
  const canvasRef = useRef();
  const videoHeight = 400;
  const videoWidth = 400;

  // load models
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models"; // Use process.env.PUBLIC_URL
      console.log("MODEL_URL", MODEL_URL);
      setInitializing(false);

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(startVideo);
    };

    loadModels();

    // Clean up the stream when the component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startVideo = () => {
    navigator.getUserMedia(
      {
        video: {},
      },
      (stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          // Now that the video has loaded metadata, we can initialize face detection
          detectFaces();
        };
      },
      (err) => console.error("getUserMedia Error: ", err)
    );
  };

  const detectFaces = async () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = faceapi.createCanvasFromMedia(video);
      const displaySize = { width: video.width, height: video.height };
      faceapi.matchDimensions(canvas, displaySize);

      // Detect faces
      const detections = await faceapi
        .detectAllFaces(video)
        .withFaceLandmarks()
        .withFaceDescriptors();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      // Clear previous detections
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

      // Draw face detections on canvas
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

      // Append canvas to the UI
      const faceCanvas = document.getElementById("face-canvas");
      faceCanvas.innerHTML = "";
      faceCanvas.appendChild(canvas);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 h-full bg-gray-200 p-4">
        <h2> {initializing ? "Wait" : "Go now"} </h2>
        <h2 className="text-2xl font-bold mb-4">Webcam Feed</h2>
        <div id="face-canvas" className="w-full h-full"></div>
      </div>
      <div className="w-1/2 h-full relative">
        <video
          ref={videoRef}
          className="h-full w-full object-cover p-2 rounded-xl"
          autoPlay
          playsInline
          muted
          height={videoHeight}
          width={videoWidth}
        />
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default WebcamComponent;
