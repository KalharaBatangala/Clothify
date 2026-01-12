// import { useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await api.post("/auth/login", form);
//       console.log("LOGIN RESPONSE FULL:", res);
//     console.log("LOGIN DATA:", res.data);

//     localStorage.setItem("token", res.data.token);
//     localStorage.setItem("user", JSON.stringify(res.data.user));

//     console.log("AFTER STORAGE:", {
//       token: localStorage.getItem("token"),
//       user: localStorage.getItem("user"),
//     });

//       // ✅ Redirect only after success
//       navigate("/", { replace: true });
//       console.log("LOGIN RESPONSE:", data);   // 🔴 testing

//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2>Login</h2>

//       {error && <p style={styles.error}>{error}</p>}

//       <form onSubmit={submitHandler} style={styles.form}>
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

//         <button type="submit">Login</button>
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
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { setUser } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      // Update context state immediately
      setUser(res.data.user);
      
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">
          Sign in to continue to <strong>Clothify</strong>
        </p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={submitHandler} className="login-form">
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

          <button type="submit" className="login-btn">
            Login
          </button>

          {/*  Register  */}
          <div className="register-link">
            <span>Don’t have an account?</span>
            <Link to="/register">Register</Link>
          </div>

        </form>
      </div>

      {/* Styles */}
      <style jsx>{`
        .login-wrapper {
          flex: 1;
          
          
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0f172a, #1e293b);
          padding: 16px;
        }


        .login-card {
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

        .login-title {
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
          color: #111827;
        }

        .login-subtitle {
          text-align: center;
          color: #6b7280;
          margin: 8px 0 24px;
        }

        .login-error {
          background: #fee2e2;
          color: #991b1b;
          padding: 10px 14px;
          border-radius: 8px;
          margin-bottom: 16px;
          font-size: 0.95rem;
          text-align: center;
        }

        .login-form {
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

        .login-btn {
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

        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
        }

        .register-link {
          margin-top: 20px;
          text-align: center;
          font-size: 0.95rem;
          color: #6b7280;
        }

        .register-link a {
          margin-left: 6px;
          color: #3b82f6;
          font-weight: 600;
          text-decoration: none;
        }

        .register-link a:hover {
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 24px;
          }

          .login-title {
            font-size: 1.7rem;
          }
        }
      `}</style>
    </div>
  );
}
