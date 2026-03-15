import Link from "next/link";
import styles from "./page.module.css";

const features = [
  {
    title: "Student Records",
    description:
      "Create, edit, and organize learner profiles with a flow that stays simple as data grows.",
  },
  {
    title: "Fast Updates",
    description:
      "Handle admissions, course changes, and cleanup tasks from a clean dashboard without friction.",
  },
  {
    title: "Focused Workflow",
    description:
      "Move from login to management screens quickly with a layout designed for daily admin work.",
  },
];

const stats = [
  { value: "1 place", label: "to manage students" },
  { value: "3 actions", label: "add, edit, delete" },
  { value: "100%", label: "built for clarity" },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.glowOne} />
      <div className={styles.glowTwo} />

      <section className={styles.hero}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Student management, without clutter</p>
          <h1 className={styles.title}>
            Run your student system from a sharp, modern dashboard.
          </h1>
          <p className={styles.description}>
            Manage student data, keep course details organized, and move through
            admin tasks with a cleaner workflow from the moment you sign in.
          </p>

          <div className={styles.actions}>
            <Link
              href="/login"
              className={`${styles.button} ${styles.primaryButton}`}
            >
              Login
            </Link>
            <Link
              href="/register"
              className={`${styles.button} ${styles.secondaryButton}`}
            >
              Create Account
            </Link>
          </div>

          <div className={styles.statRow}>
            {stats.map((item) => (
              <div key={item.label} className={styles.statCard}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelBadge}>Live overview</span>
            <span className={styles.panelHint}>Admin workspace</span>
          </div>

          <div className={styles.panelBody}>
            <div className={styles.metricCard}>
              <span>Total students</span>
              <strong>248</strong>
            </div>
            <div className={styles.metricCard}>
              <span>New this week</span>
              <strong>18</strong>
            </div>
            <div className={styles.metricWide}>
              <span>System note</span>
              <p>
                Course assignments and student updates are easier to review from
                one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.featureGrid}>
        {features.map((feature, index) => (
          <article key={feature.title} className={styles.featureCard}>
            <span className={styles.featureIndex}>0{index + 1}</span>
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
