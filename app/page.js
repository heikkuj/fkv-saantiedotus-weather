import styles from "./page.module.css";
import Title from "./components/title/title"
import Search from "./components/search/search"
import Degrees from "./components/degrees/degrees"

export default function Home() {
  return (
    <>
    <Title />
    <Search />
    <Degrees />
    </>
  );
}
