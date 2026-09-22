import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import { getAllSlang } from "@/lib/slang";

export default function Home() {
  const terms = getAllSlang().slice(0, 12);

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-4xl font-bold">Slang Decoder</h1>
      <p className="mt-2 text-gray-600">What does that even mean?</p>

      <SearchBar />

      <h2 className="mt-10 text-xl font-semibold">Trending terms</h2>
      <ul className="mt-4 grid grid-cols-2 gap-3">
        {terms.map((term) => (
          <li key={term.slug}>
            <Link
              href={`/slang/${term.slug}`}
              className="block rounded border p-3 hover:bg-gray-50"
            >
              {term.term}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}