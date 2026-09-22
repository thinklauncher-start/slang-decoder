import { notFound } from "next/navigation";
import { getAllSlang, getSlangBySlug } from "@/lib/slang";

export function generateStaticParams() {
  return getAllSlang().map((term) => ({ slug: term.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const term = getSlangBySlug(slug);

  if (!term) return {};

  return {
    title: `${term.term} meaning — Slang Decoder`,
    description: term.definition,
  };
}

export default async function SlangPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const term = getSlangBySlug(slug);

  if (!term) notFound();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What does ${term.term} mean?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: term.definition,
        },
      },
    ],
  };

  return (
    <main className="mx-auto max-w-2xl p-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h1 className="text-4xl font-bold">{term.term}</h1>

      <p className="mt-4 text-lg">{term.definition}</p>

      <div className="mt-6 rounded bg-gray-100 p-4">
        <strong>Example:</strong> {term.example}
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Cringe risk: {term.cringeRisk}/10
      </p>

      {term.origin && (
        <p className="mt-2 text-sm text-gray-500">Origin: {term.origin}</p>
      )}

      <p className="mt-2 text-sm text-gray-400">
        Last updated: {term.lastUpdated}
      </p>
    </main>
  );
}