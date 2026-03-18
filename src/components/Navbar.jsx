"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  

  return (
    <header className={styles.header}>
      <div className={styles.brandBlock}>
        <span className={styles.brandDot} />
        <div>
          <p className={styles.brandLabel}>Student Admin</p>
          <h1 className={styles.brandTitle}>Control Center</h1>
        </div>
      </div>

      <nav className={styles.actions}>   
        <Link
          href="/dashboard"
          className={`${styles.navButton} ${pathname === "/dashboard" ? styles.active : ""}`}
        >
          Dashboard
        </Link>
        <button
          onClick={logout}
          className={`${styles.navButton} ${styles.logoutButton}`}
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
