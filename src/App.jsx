import { useState, useRef, useEffect } from "react"
import * as tf from "@tensorflow/tfjs"
// 1. TODO - Import required model here
import * as cocossd from "@tensorflow-models/coco-ssd"
import Webcam from "react-webcam"
import "./App.css"
// 2. TODO - Import drawing utility here
import { drawRect } from "./utilities"

function App() {
  const [isBtnToggle, setIsBtnToggle] = useState(false)
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)

  // main function - bosh function
  const runCoco = async () => {
    // 3. TODO - Load network
    // e.g. const net = await cocossd.load();
    const net = await cocossd.load()
    setInterval(() => {
      detect(net)
    }, 10)
  }

  const detect = async (net) => {
    // Check data is available - Ma'lumotlar mavjudligini tekshiring

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties - Video xususiyatlarini olish
      const video = webcamRef.current.video
      const videoWidth = webcamRef.current.video.videoWidth
      const videoHeight = webcamRef.current.video.videoHeight

      // Set video width - Video enini o'rnatish
      webcamRef.current.width = videoWidth
      webcamRef.current.height = videoHeight

      // Set canvas height and width - Kanva balandligi va enini sozlash
      canvasRef.current.width = videoWidth
      canvasRef.current.height = videoHeight

      // 4. TODO - Make Detections - 4. TODO - Tanilarni aniqlash
      // e.g. const obj = await net.detect(video); - Misol uchun, const obj = await net.detect(video);
      const obj = await net.detect(video)
      // console.log(obj)

      // Draw mesh - Chizish mesh
      const ctx = canvasRef.current.getContext("2d")

      // 5. TODO - Update drawing utility
      drawRect(obj, ctx)
      // console.log(obj, ctx)
    }
  }

  useEffect(() => {
    runCoco()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {isBtnToggle ? (
          <>
            <Webcam
              ref={webcamRef}
              muted={true}
              audio={false}
              mirrored={false}
              style={{
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                textAlign: "center",
                zindex: 9,
                width: 640,
                height: 480,
              }}
            />
            <canvas
              ref={canvasRef}
              style={{
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                textAlign: "center",
                zindex: 8,
                width: 640,
                height: 480,
              }}
            />
          </>
        ) : (
          <div className="video__background"></div>
        )}

        <button
          type="button"
          className="button"
          style={{ backgroundColor: !isBtnToggle ? "#21fd6bff" : "#d00" }}
          onClick={() => setIsBtnToggle(!isBtnToggle)}
        >
          {isBtnToggle ? "STOP VIDEO" : "START VIDEO"}
        </button>
      </header>
    </div>
  )
}

export default App
