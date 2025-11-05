import "./App.css";
import Users from "./components/Users.jsx";
import Posts from "./components/Posts.jsx";

function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>JSONPlaceholder — Users & Posts</h1>
        <p className="tagline">
          Exercícios progressivos com fetch, console e renderização no React
        </p>
      </header>

      <Users />
      <Posts />

      <footer className="footer">
        <small>Feito com React + Vite</small>
      </footer>
    </div>
  );
}

export default App;
