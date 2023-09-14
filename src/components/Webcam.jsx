import React, { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import Loading from "./Loading";
import Face from "./Face";
import Skin from "./Skin";

// Define mapping functions for skin features
const mapSkinColor = (value) => {
  // Define your own logic to map the skin color value to text description
  if (value < 0.3) return "Light";
  if (value < 0.6) return "Medium";
  return "Dark";
};

const mapFreckles = (value) => {
  // Define your own logic to map the freckles value to text description
  if (value < 0.2) return "Few";
  if (value < 0.5) return "Some";
  return "Many";
};

const mapWrinkles = (value) => {
  // Define your own logic to map the wrinkles value to text description
  if (value < 0.4) return "Low";
  if (value < 0.7) return "Medium";
  return "High";
};

const WebcamComponent = () => {
  const [initializing, setInitializing] = useState(true);
  const [expressions, setExpressions] = useState([]);
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);
  const [skinFeatures, setSkinFeatures] = useState({
    skinColor: "",
    freckles: "",
    wrinkles: "",
    // Add more features as needed
  });

  console.log("skinFeatures", skinFeatures);
  const videoRef = useRef();
  const videoCanvasRef = useRef();
  const videoHeight = 400;
  const videoWidth = 400;

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models"; // Update to the correct path
      setInitializing(true);
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      await faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL);
      startWebcam();
    };

    loadModels();

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
        setInitializing(false);
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
      const displaySize = { width: videoWidth, height: videoHeight };
      faceapi.matchDimensions(videoCanvasRef.current, displaySize);
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender()
        .withFaceDescriptors();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      // Clear previous dots
      const ctx = videoCanvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, videoWidth, videoHeight);

      faceapi.draw.drawFaceLandmarks(videoCanvasRef.current, resizedDetections);

      // Extract and set detected expressions
      if (resizedDetections.length > 0) {
        const expressionsObj = resizedDetections[0].expressions;
        const detectedExpressions = Object.keys(expressionsObj).filter(
          (expression) => expressionsObj[expression] > 0.7
        );
        const faceDescriptor = resizedDetections[0].descriptor;

        // Map numerical values to text descriptions for skin features
        const mappedFeatures = {
          skinColor: mapSkinColor(faceDescriptor[0]),
          freckles: mapFreckles(faceDescriptor[1]),
          wrinkles: mapWrinkles(faceDescriptor[2]),
          // Add more features as needed
        };

        // Update state with mapped features
        setSkinFeatures(mappedFeatures);

        // Extract and set age and gender
        setAge(resizedDetections[0].age);
        setGender(resizedDetections[0].gender);
        if (detectedExpressions.length > 0) {
          setExpressions(detectedExpressions);
        }
      }
    }, 1000);
  };

  return (
    <div className="h-screen w-screen flex flex-row justify-between items-center">
      {initializing && <Loading />}

      <div className="h-full w-5/12 flex justify-center items-center relative">
        <video
          ref={videoRef}
          className="h-full w-full object-fill"
          autoPlay
          playsInline
          onPlay={handleVideoPlay}
          muted
        />
        <canvas
          ref={videoCanvasRef}
          width="100%"
          height="100%"
          className="absolute w-full h-full"
        ></canvas>
      </div>
      <div className="w-7/12 h-full flex flex-col gap-4 bg-blue-100">
        {/* separated component for face only (age, expressions, and gender) */}
        {!initializing && (
          <>
            <Face expressions={expressions} age={age} gender={gender} />
            <Skin skinFeatures={skinFeatures} />
          </>
        )}
      </div>
    </div>
  );
};

export default WebcamComponent;
