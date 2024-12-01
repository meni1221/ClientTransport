import PageHeader from "../components/PageHeader";

const developers = [
  {
    name: "Meni",
    // image: meni,
    story: "Full Stack Developer",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader title="Meet the Developers" subtitle="Pearl Team" />
      <div className="about-container">
        <div className="developers-list">
          {developers.map((dev, index) => (
            <div key={index} className="developer-card">
              {/* <img src={dev.image} alt={dev.name} className="developer-image" /> */}
              <h3>{dev.name}</h3>
              <p>{dev.story}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
