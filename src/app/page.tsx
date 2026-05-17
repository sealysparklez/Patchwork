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

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/Pictochat-revived-0.webp"
          alt="Next.js logo"
          width={200}
          height={40}
          priority
        />
      <div className={styles.maincontent}>
        <div className={styles.intro}>
          <h1>Tools</h1>

          <div className="d-flex gap-2 align-items-center ">
            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              disabled={!eraseMode}
              onClick={handlePenClick}
            >
              Pen
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              disabled={eraseMode}
              onClick={handleEraserClick}
            >
              Eraser
            </button>
            <label htmlFor="strokeWidth" className="form-label">
              Stroke width
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
              Eraser width
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

          <div className="d-flex gap-2 align-items-center ">
            <label htmlFor="color">Stroke color</label>
            <input
              type="color"
              value={strokeColor}
              onChange={handleStrokeColorChange}
            />
            <label htmlFor="color">Canvas color</label>
            <input
              type="color"
              value={canvasColor}
              onChange={handleCanvasColorChange}
            />
          </div>
        
          </div>
          <ReactSketchCanvas
            ref={canvasRef}
            strokeWidth={strokeWidth}
            eraserWidth={eraserWidth}
            strokeColor={strokeColor}
            canvasColor={canvasColor}
          />
          <form onSubmit={(e) => {
            e.preventDefault();
            handleUpload(new FormData(e.currentTarget));
          }}>
            <input type="file" name="file" accept="image/*" />
            <button type="submit">Upload</button>
          </form>
        </div>
        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
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
        </div>
        <div className={styles.lowerText}>
          <h1>About</h1>
           </div>

          <div className={styles.purpose}>
          <h2> Intended Purpose:</h2>
          <p> This Website allows peope to show the creative sides of themselves by drawing. We show the drawings of people who used this into a gallery. </p>
        </div>  

        <div className={styles.connects}>
          <h2> How it connects with Theme: </h2>
          <p> Connects with joining creative people together to make connections by singular theme, whic in this case is by art. Also to bring back some happier times in life!</p>
        </div>
        
          <div className={styles.credits}>
            <h4> Credits</h4>
            <p> By: Jordan, Ashylen, Sompan, and Ryan</p>
          </div>
      </main>
    </div>
  );
}
