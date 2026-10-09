import { useEffect, useState } from 'react';
import './App.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

function App() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE_URL}/api/profile`).then((response) => {
        if (!response.ok) throw new Error('Unable to load profile');
        return response.json();
      }),
      fetch(`${API_BASE_URL}/api/projects`).then((response) => {
        if (!response.ok) throw new Error('Unable to load projects');
        return response.json();
      })
    ])
      .then(([profileData, projectsData]) => {
        setProfile(profileData);
        setProjects(projectsData);
      })
      .catch(() => setError('The backend API is not available. Start Spring Boot on port 8080.'));
  }, []);

  if (error) {
    return <main className="page"><p className="error">{error}</p></main>;
  }

  if (!profile) {
    return <main className="page"><p>Loading...</p></main>;
  }

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">PERSONAL WEBSITE</p>
        <h1>{profile.name}</h1>
        <h2>{profile.role}</h2>
        <p className="bio">{profile.bio}</p>
        <a className="button" href={`mailto:${profile.email}`}>
          Contact me
        </a>
      </section>

      <section className="section">
        <h2>Skills</h2>
        <div className="skills">
          {profile.skills.map((skill) => <span key={skill}>{skill}</span>)}
        </div>
      </section>

      <section className="section">
        <h2>Projects</h2>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="technologies">
                {project.technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
              <a href={project.url} target="_blank" rel="noreferrer">
                View project
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;