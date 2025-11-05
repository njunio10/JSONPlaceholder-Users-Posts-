import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        console.log("Users (array):", data);
        console.table(data);
        setUsers(data);
      } catch (err) {
        console.error("Erro ao buscar users:", err);
        setError("Falha ao carregar usuários");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <section className="section">
        <h2 className="sectionTitle">Users</h2>
        <p>Carregando usuários…</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section">
        <h2 className="sectionTitle">Users</h2>
        <p className="error">{error}</p>
      </section>
    );
  }

  return (
    <section className="section">
      <h2 className="sectionTitle">Users</h2>

      <h3 className="subTitle">Básico: id, name, username</h3>
      <div className="tableWrapper">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="subTitle">Expandido: name, email, phone, website</h3>
      <div className="grid">
        {users.map((u) => (
          <article key={`extended-${u.id}`} className="card">
            <h4 className="cardTitle">{u.name}</h4>
            <div className="kv">
              <span className="k">Email</span>
              <span className="v">
                <a href={`mailto:${u.email}`}>{u.email}</a>
              </span>
            </div>
            <div className="kv">
              <span className="k">Phone</span>
              <span className="v">
                <a href={`tel:${u.phone}`}>{u.phone}</a>
              </span>
            </div>
            <div className="kv">
              <span className="k">Website</span>
              <span className="v">
                <a
                  href={`https://${u.website}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {u.website}
                </a>
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Users;
