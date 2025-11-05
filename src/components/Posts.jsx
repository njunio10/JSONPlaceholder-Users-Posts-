import { useEffect, useState } from "react";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        console.log("Posts (array):", data);
        console.table(data);
        setPosts(data);
      } catch (err) {
        console.error("Erro ao buscar posts:", err);
        setError("Falha ao carregar posts");
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section className="section">
        <h2 className="sectionTitle">Posts</h2>
        <p>Carregando posts…</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section">
        <h2 className="sectionTitle">Posts</h2>
        <p className="error">{error}</p>
      </section>
    );
  }

  return (
    <section className="section">
      <h2 className="sectionTitle">Posts</h2>

      <h3 className="subTitle">Básico: userId, id, title</h3>
      <div className="tableWrapper">
        <table className="table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>ID</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {posts.slice(0, 20).map((p) => (
              <tr key={p.id}>
                <td>{p.userId}</td>
                <td>{p.id}</td>
                <td>{p.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="subTitle">Expandido: userId, id, title e body</h3>
      <div className="grid">
        {posts.slice(0, 20).map((p) => (
          <article key={`extended-${p.id}`} className="card">
            <div className="kv">
              <span className="k">User</span>
              <span className="v">{p.userId}</span>
            </div>
            <div className="kv">
              <span className="k">ID</span>
              <span className="v">{p.id}</span>
            </div>
            <h4 className="cardTitle">{p.title}</h4>
            <p className="bodyText">{p.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Posts;
