import React, { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import Loading from "./Loading";

const WebcamComponent = () => {
  // initiase states---
  const [initializing, setInitializing] = useState(true);
  const [expressions, setExpressions] = useState([]);
  const videoRef = useRef();
  const canvasRef = useRef();
  const videoHeight = 400;
  const videoWidth = 400;

  // loading video
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models"; // Update to the correct path
      setInitializing(true);
      Promise.all([
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        await faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
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
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      // Clear previous detections
      canvasRef.current
        .getContext("2d")
        .clearRect(0, 0, videoWidth, videoHeight);

      // Draw face detections on canvas
      faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);

      // Extract and set detected expressions
      if (resizedDetections.length > 0) {
        const expressionsObj = resizedDetections[0].expressions;
        const detectedExpressions = Object.keys(expressionsObj).filter(
          (expression) => expressionsObj[expression] > 0.7
        );
        setExpressions(detectedExpressions);
      } else {
        setExpressions([]);
      }
    }, 100);
  };

  return (
    <div className="h-screen w-screen  flex flex-col justify-between items-center bg-[#2046F5] p-4">
      {initializing && <Loading />}

      <div className="h-3/12  w-full flex flex-row justify-between  items-center gap-4">
        <div className="h-auto w-2/12">
          <video
            ref={videoRef}
            className="object-cover shadow-2xl rounded-xl border-2 border-gray-300"
            autoPlay
            playsInline
            onPlay={handleVideoPlay}
            muted
            height={videoHeight}
            width={videoWidth}
          />
        </div>
        <div className="w-full">
          <h2>
            Detected Expressions:{" "}
            {expressions.length > 0 ? expressions.join(", ") : "None"}
          </h2>
        </div>
      </div>
      <div className="w-full h-9/12  flex flex-row justify-center items-center bg-[#2046F5]">
        <canvas
          ref={canvasRef}
          width={videoWidth}
          height={videoHeight}
        ></canvas>
      </div>
    </div>
  );
};

export default WebcamComponent;
