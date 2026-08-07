import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-shell" style={{ display: "grid", alignContent: "center", gap: "2rem" }}>
      <p className="mono">404 / Esta ruta no existe</p>
      <h1 className="display" style={{ fontSize: "clamp(4rem, 14vw, 13rem)", lineHeight: 0.8 }}>
        Volvamos al estudio.
      </h1>
      <Link className="mono" href="/">← Ir al inicio</Link>
    </main>
  );
}
