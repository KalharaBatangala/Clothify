export default function Footer() {
  return (
    <footer style={{
      width: "100%",
      padding: "16px",
      background: "#0000A3",
      color: "#fff",
      textAlign: "center",
      marginTop: "40px"
    }}>
      © {new Date().getFullYear()} Clothify | All rights reserved.
    </footer>
  );
}
