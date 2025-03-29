import Navbar from "../components/navbar.js"
import styles from "../styles/home.module.css";


export default function Home() {
  return (
    <>
      <Navbar/>
      <div className= {styles.diag} /> {/* the white diagonal part */}
    </>
  );
}
