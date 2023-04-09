import Link from "next/link";

export default function Custom404() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <section className="text-center">
        <p className="text-4xl">404 - Page Not Found</p>
        <br />
        <span>Go to </span>
        <Link className="underline" href={"/"}>
          Home
        </Link>
      </section>
    </main>
  );
}
