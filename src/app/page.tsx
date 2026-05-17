"use client";
import Image from "next/image";
import styles from "./page.module.css";
import {
  ReactSketchCanvas,
  type ReactSketchCanvasRef,
} from "react-sketch-canvas";
import { type ChangeEvent, useRef, useState } from "react";

export default function Home() {
  async function handleUpload(formData: FormData) {
    await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
  }

  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [eraseMode, setEraseMode] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [eraserWidth, setEraserWidth] = useState(10);
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [canvasColor, setCanvasColor] = useState("#ffffff");

  const handleEraserClick = () => {
    setEraseMode(true);
    canvasRef.current?.eraseMode(true);
  };

  const handlePenClick = () => {
    setEraseMode(false);
    canvasRef.current?.eraseMode(false);
  };

  const handleUndoClick = () => {
    canvasRef.current?.undo();
  };

  const handleRedoClick = () => {
    canvasRef.current?.redo();
  };

  const handleClearClick = () => {
    canvasRef.current?.clearCanvas();
  };

  const handleStrokeWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStrokeWidth(+event.target.value);
  };

  const handleEraserWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEraserWidth(+event.target.value);
  };

  const handleStrokeColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStrokeColor(event.target.value);
  };

  const handleCanvasColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCanvasColor(event.target.value);
  };

  // const submitDrawing = () => {
  //   canvasRef.current?.exportImage('jpeg')
  //   .then((data) =>{
  //     console.log(data)
  //     const now = new Date();
  //     const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, 19);

  //     const link = document.createElement('a')
  //     link.href = data
  //     // link.download = "canvas.png"
  //     link.download = `canvas-${timestamp}.png`;
  //     link.click()
  //   })
  // };

  const submitDrawing = async () => {
  const dataUrl = await canvasRef.current?.exportImage('jpeg');
  if (!dataUrl) return;

  const res = await fetch(dataUrl);
  const blob = await res.blob();

  const formData = new FormData();
  formData.append('file', blob, 'drawing.jpg');

  await handleUpload(formData);
};


  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/patchworklogo.png"
          alt="Patchwork logo"
          width={1000}
          height={256}
          style={{ width: 500, height: 'auto' }} 
          priority
        />
      <div className={styles.maincontent}>
        <div className={styles.intro}>
          <h2>"Stitching a community together, one artwork at a time"</h2>
          <h1>Tools</h1>

          <div className={styles.toolBar}>
            <button
              type="button"
              className={styles.toolBtn}
              disabled={!eraseMode}
              onClick={handlePenClick}
            >
              Pen
            </button>
            
            <button
              type="button"
              className={styles.toolBtn}
              disabled={eraseMode}
              onClick={handleEraserClick}
            >
              Eraser
            </button>

            <button
              type="button"
              className={styles.toolBtn}
              onClick={handleUndoClick}
            >
              Undo
            </button>
            <button
              type="button"
              className={styles.toolBtn}
              onClick={handleRedoClick}
            >
              Redo
            </button>
            <button
              type="button"
              className={styles.toolBtn}
              onClick={handleClearClick}
            >
              Clear
            </button> </div>
             
             <div className={styles.sliders}>
            <label htmlFor="strokeWidth" className="form-label">
              Stroke Width
            </label>
            <input
              disabled={eraseMode}
              type="range"
              className="form-range"
              min="1"
              max="20"
              step="1"
              id="strokeWidth"
              value={strokeWidth}
              onChange={handleStrokeWidthChange}
            />
            <label htmlFor="eraserWidth" className="form-label">
              Eraser Width
            </label>
            <input
              disabled={!eraseMode}
              type="range"
              className="form-range"
              min="1"
              max="20"
              step="1"
              id="eraserWidth"
              value={eraserWidth}
              onChange={handleEraserWidthChange}
            />
            </div>
          <div className={styles.colors}>
            <label htmlFor="color">Stroke Color</label>
            <input
              type="color"
              value={strokeColor}
              onChange={handleStrokeColorChange}
            />
            <label htmlFor="color">Canvas Color</label>
            <input
              type="color"
              value={canvasColor}
              onChange={handleCanvasColorChange}
            />
          </div>
        
          
          <ReactSketchCanvas
            width="500px" 
            height="500px" 
            ref={canvasRef}
            strokeWidth={strokeWidth}
            eraserWidth={eraserWidth}
            strokeColor={strokeColor}
            canvasColor={canvasColor}
          />

          <div className={styles.ctas}>
          <a
            type="button"
            className={styles.secondary}
            onClick={submitDrawing}
            >
              Submit Drawing
          </a>
                    <a
            className={styles.secondary}
            href="/gallery"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gallery
          </a>
        </div>
          <p>You can optionally upload an image below.</p>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleUpload(new FormData(e.currentTarget));
          }}>
            <input type="file" name="file" accept="image/*" />
            <button type="submit">Upload</button>
          </form>
        </div>
        <div className={styles.ctas}>
        </div>

          <div className={styles.intro}>
          </div>



        </div>
          <h2> How to Use!</h2>
          <ol>
            {/* <li>Draw anything you want in the canvas.</li>
            <li>Press "Submit Drawing". Your drawing will be downloaded to your device.</li>
            <li>Select "Choose File" and select your drawing from your downloads directory.</li>
            <li>Press Upload to save your drawing to the online gallery for everyone to view!</li> */}
                        <li>Draw anything you want in the canvas.</li>
            <li>Press "Submit Drawing". Your drawing will be saved to our sever.</li>
            <li>You're done! Optionally, you can upload your own image.</li>
          </ol> 
          <h2 style={{ marginTop: "32px" }}> </h2>
          <h2>Creating connections through creativity</h2>
          <p>As people who participate in art communities, we noticed that creatives are always looking for new ways to build community and foster their skills. However, social media can often be a cruel place and tags can often make viewing a community's art disorganized. The community gallery puts everyone's art on display for everyone to enjoy without the clutter of social media.</p>
      </main>
    </div>
  );
}
