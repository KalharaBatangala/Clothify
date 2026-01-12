// import { useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const { data } = await api.post("/auth/register", form);
//       localStorage.setItem("token", data.token);
//       navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2>Create Account</h2>

//       {error && <p style={styles.error}>{error}</p>}

//       <form onSubmit={submitHandler} style={styles.form}>
//         <input
//           name="name"
//           placeholder="Name"
//           onChange={handleChange}
//           required
//         />
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           onChange={handleChange}
//           required
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           onChange={handleChange}
//           required
//         />

//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }


// const styles = {
//   container: {
//     maxWidth: "400px",
//     margin: "40px auto",
//     padding: "24px",
//     border: "1px solid #ddd",
//     borderRadius: "8px",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "12px",
//   },
//   error: {
//     color: "red",
//   },
// };


import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await api.post("/auth/register", form);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h2 className="register-title">Create Account</h2>
        <p className="register-subtitle">
          Sign up to start shopping on <strong>Clothify</strong>
        </p>

        {error && <div className="register-error">{error}</div>}

        <form onSubmit={submitHandler} className="register-form">
          <div className="input-group">
            <label>Name</label>
            <input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>

        <div className="login-link">
          Already have an account?
          <Link to="/login">Login</Link>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .register-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0f172a, #1e293b);
          padding: 16px;
        }

        .register-card {
          width: 100%;
          max-width: 420px;
          background: #ffffff;
          padding: 32px;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
          animation: fadeIn 0.6s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .register-title {
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
          color: #111827;
        }

        .register-subtitle {
          text-align: center;
          color: #6b7280;
          margin: 8px 0 24px;
        }

        .register-error {
          background: #fee2e2;
          color: #991b1b;
          padding: 10px 14px;
          border-radius: 8px;
          margin-bottom: 16px;
          font-size: 0.95rem;
          text-align: center;
        }

        .register-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .input-group label {
          font-size: 0.9rem;
          color: #374151;
          font-weight: 500;
        }

        .input-group input {
          padding: 12px 14px;
          border-radius: 10px;
          border: 1px solid #d1d5db;
          font-size: 1rem;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .input-group input:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25);
        }

        .register-btn {
          margin-top: 12px;
          padding: 14px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(90deg, #6366f1, #3b82f6);
          color: #ffffff;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .register-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
        }

        .login-link {
          margin-top: 20px;
          text-align: center;
          font-size: 0.95rem;
          color: #6b7280;
        }

        .login-link a {
          margin-left: 6px;
          color: #3b82f6;
          font-weight: 600;
          text-decoration: none;
        }

        .login-link a:hover {
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .register-card {
            padding: 24px;
          }

          .register-title {
            font-size: 1.7rem;
          }
        }
      `}</style>
    </div>
  );
}
