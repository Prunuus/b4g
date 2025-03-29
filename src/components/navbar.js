import Image from "next/image";
import Link from "next/link";
import styles from "../styles/navbar.module.css"
import { Gabarito, Roboto } from "next/font/google";

const gabarito = Gabarito({
    subsets: ['latin'],
    weight: ['400'],
  });


export default function Home() {
  return (
    <nav className={`${gabarito.className}  ${styles.nav}`} >
        <Link href={"/"}>
            <Image
            src={"/cat.png"}
            alt="cat"
            width="100"
            height={100}
            />
        </Link>
        <p className={styles.text} >
            Lotto-Exams
        </p>

    </nav>
  );
}
