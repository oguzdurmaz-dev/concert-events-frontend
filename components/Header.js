import Link from "next/link";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import styles from "../styles/Header.module.css";
import Search from "./Search";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
export default function Header() {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>Concert Events</a>
        </Link>
      </div>
      <div>
        <Search />
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/events">
              <a>Events</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          {user ? (
            //if logged in
            <>
              {" "}
              
              <li>
                <Link href="/account/dashboard">
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <button
                  className="btn-secondary btn-icon"
                  onClick={() => logout()}
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            //if logged out
            <>
              {" "}
              <li>
                <Link href="/account/login">
                  <a className="btn-secondary btn-icon">
                    <FaSignInAlt /> Login
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
