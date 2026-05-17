"use client";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  async function handleUpload(formData: FormData) {
    await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
  }

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
          {/* <h1>To get started, edit the page.tsx file.</h1>
          <p>
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learning
            </a>{" "}
            center.
          </p> */}
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
            <p> By: Jordan, Ashylen, Pyyra, and Ryan</p>
          </div>
      </main>
    </div>
  );
}
