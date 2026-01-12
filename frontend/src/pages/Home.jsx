import ProductGrid from "../components/ProductGrid";

export default function Home() {
  return (
    <div style={{ padding: "32px" }}>
      <h1 style={{ marginBottom: "24px" }}>Latest Products</h1>
      <ProductGrid />
    </div>
  );
}
