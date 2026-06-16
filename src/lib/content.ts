export type PortfolioItem = {
  id: string;
  name: string;
  industry: string;
  category: string;
  description: string;
  deliverables: string[];
  img: string;
};

export type ClientItem = {
  id: string;
  name: string;
  desc: string;
  type: string;
  img?: string;
  featured: boolean;
  summary: string;
  services: string[];
};

export type ContactMessage = {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  website: string;
  industry: string;
  budget: string;
  services: string[];
  contactMethod: string;
  message: string;
  status: "new" | "read";
  createdAt?: {
    toDate?: () => Date;
  };
};

export const fallbackPortfolio: PortfolioItem[] = [
  {
    id: "aura-cafe",
    name: "Aura Cafe",
    industry: "Luxury Cafe",
    category: "Hospitality",
    description:
      "A premium cafe brand requiring a full digital identity, from brand voice to content strategy and weekly social content production.",
    deliverables: ["Brand Voice Guide", "Social Media Strategy", "Monthly Content Calendar", "Reel Production"],
    img: "https://images.unsplash.com/photo-1745611333939-980b644f8e60?w=700&h=500&fit=crop&auto=format",
  },
  {
    id: "eclat-fashion",
    name: "Eclat Fashion",
    industry: "Fashion Label",
    category: "Fashion",
    description:
      "An emerging fashion label seeking to grow its Instagram presence and convert followers into loyal customers.",
    deliverables: ["Instagram Strategy", "Content Calendar", "Styling Direction", "Campaign Ideation"],
    img: "https://images.unsplash.com/photo-1763069228076-c7e3995e1769?w=700&h=500&fit=crop&auto=format",
  },
  {
    id: "serenova-hotels",
    name: "Serenova Hotels",
    industry: "Hotel",
    category: "Hospitality",
    description:
      "A boutique hotel group seeking a stronger social presence and professional video content to showcase their properties.",
    deliverables: ["On-Location Filming", "Brand Film", "Social Media Management", "Photography"],
    img: "https://images.unsplash.com/photo-1621293954908-907159247fc8?w=700&h=500&fit=crop&auto=format",
  },
];

export const fallbackClients: ClientItem[] = [
  {
    id: "abvv-hospitality",
    name: "Atal Bihari Vajpayee Vishwavidyalaya",
    desc: "Department of Hotel Management & Hospitality",
    type: "Educational Institution",
    featured: true,
    summary:
      "A distinguished university department in India committed to building the next generation of hospitality professionals.",
    services: ["Social Media Strategy", "Content Planning", "Digital Outreach"],
  },
];

export function tagsFromInput(value: string) {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function tagsToInput(tags: string[]) {
  return tags.join(", ");
}
