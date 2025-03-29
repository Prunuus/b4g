import Image from "next/image.js";
import Navbar from "../components/navbar.js"
import styles from "../styles/home.module.css";
import { Jaro } from "next/font/google";
import Link from "next/link.js";

const jaro = Jaro({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-jaro",
});


export default function Home() {
  return (
    <div styles={styles.background}>
      <Navbar/>
      <div className= {styles.diag} /> {/* the white diagonal part */}
      <Image
      src={"/person.png"}
      alt="person studying"
      fill={true}
      className={styles.image}
      />
      <div className={styles.textContainer}>
        <p className={`${styles.textBig} ${jaro.className} `}>Never miss another exam</p>
        <p className={`${styles.textSub} `}>Exams all in one place for you and your friends</p>
        <Link
        href={"/post"}
        className={styles.link}
        >
          <button className={styles.button}>Get Started</button>
        </Link>
      </div>
      
    </div>
  );
}
