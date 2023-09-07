import React, { useState, useEffect, useRef } from "react";
// import * as faceapi from "@vladmandic/face-api";
import * as faceapi from "face-api.js";
import loader from "../assets/loader.gif";

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
    <div className=" h-screen w-screen bg-blue-900 flex flex-row justify-center items-center">
      {initializing && (
        <div className="flex flex-col bg-white  justify-center items-center text-center w-screen h-screen absolute top-0 right-0">
          <img src={loader} alt="loader" className="w-2/12" />
          <h2 className="text-2xl text-gray-500 ">Please wait...</h2>
        </div>
      )}
      <div className="w-1/2 h-full  ">
        <canvas ref={canvasRef} className="w-full h-full "></canvas>
      </div>
      <div className="w-1/2 h-full  flex flex-row justify-center items-center">
        <video
          ref={videoRef}
          className="h-10/12 w-10/12 object-cover shadow-2xl rounded-xl border-2 border-gray-300"
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
