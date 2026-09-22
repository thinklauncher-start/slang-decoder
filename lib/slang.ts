import slangData from "@/data/slang.json";

export type SlangTerm = {
  term: string;
  slug: string;
  definition: string;
  example: string;
  origin?: string;
  cringeRisk: number;
  tags: string[];
  lastUpdated: string;
};

const slang: SlangTerm[] = slangData as SlangTerm[];

export function getAllSlang() {
  return slang;
}

export function getSlangBySlug(slug: string) {
  return slang.find((item) => item.slug === slug);
}

export function searchSlang(query: string) {
  const q = query.toLowerCase();
  return slang.filter(
    (item) =>
      item.term.toLowerCase().includes(q) ||
      item.tags.some((tag) => tag.toLowerCase().includes(q))
  );
}