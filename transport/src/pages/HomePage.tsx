import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <PageHeader
        title="Welcome to תחבורה"
        subtitle="אפליקצית התחבורה החדשה שלך ."
      />

      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <button className="cta-button">
          <Link to="/login">Get Started</Link>
        </button>
      </section>
    </>
  );
}
