import styles from "../styles/Layout.module.css";
import Header from "./Header";
import { useLoader } from "./LoaderContext";

export default function Layout({ children, setPage, user }) {

  const { loading } = useLoader();
  return (
    <>
      <div className={`${styles.layout}`}>
        <Header user={user} />
        {children}

        {
          loading &&
        <div className={styles.layer}>
          <div className={styles.custom_loader}></div>
        </div>
        }
      </div>
    </>
  );
}
