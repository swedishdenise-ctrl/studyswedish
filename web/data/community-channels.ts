export type CommunityChannel = {
  slug: string;
  name: string;
  description: string;
  icon: string;
  accentColor: string;
  postType: "discussion" | "review" | "event" | "listing";
};

export const communityChannels: CommunityChannel[] = [
  {
    slug: "places-to-see",
    name: "Places to See",
    description:
      "Travel destinations, hidden gems, and natural wonders across Sweden.",
    icon: "map-pin",
    accentColor: "#2D6A4F",
    postType: "review",
  },
  {
    slug: "food-recipes",
    name: "Food & Recipes",
    description:
      "Swedish recipes, cooking tips, and food culture — from kanelbullar to surströmming.",
    icon: "chef-hat",
    accentColor: "#E07A5F",
    postType: "discussion",
  },
  {
    slug: "restaurants",
    name: "Restaurants & Cafés",
    description:
      "Discover the best places to eat across Sweden, from local favorites to hidden gems.",
    icon: "utensils",
    accentColor: "#B8965A",
    postType: "review",
  },
  {
    slug: "hotels-stays",
    name: "Hotels & Stays",
    description:
      "Accommodation tips, reviews, and recommendations for every budget.",
    icon: "bed",
    accentColor: "#C0714A",
    postType: "review",
  },
  {
    slug: "events",
    name: "Events",
    description:
      "Midsommar gatherings, meetups, concerts, and local happenings.",
    icon: "calendar",
    accentColor: "#D4A373",
    postType: "event",
  },
  {
    slug: "meet-people",
    name: "Meet People",
    description:
      "Find study partners, language exchange buddies, and new friends.",
    icon: "users",
    accentColor: "#8B6A3E",
    postType: "discussion",
  },
  {
    slug: "living-in-sweden",
    name: "Living in Sweden",
    description:
      "Visa, personnummer, banking, daily life — everything for newcomers and residents.",
    icon: "home",
    accentColor: "#5A3E20",
    postType: "discussion",
  },
  {
    slug: "jobs-career",
    name: "Jobs & Career",
    description:
      "Working in Sweden, job hunting, visa sponsorship, and career advice.",
    icon: "briefcase",
    accentColor: "#4A6741",
    postType: "discussion",
  },
  {
    slug: "language-help",
    name: "Language Help",
    description:
      "Grammar questions, translations, study tips, and learning resources.",
    icon: "book-open",
    accentColor: "#C9A04A",
    postType: "discussion",
  },
  {
    slug: "culture-traditions",
    name: "Culture & Traditions",
    description:
      "Holidays, customs, lagom, fika, and the Swedish way of life.",
    icon: "flag",
    accentColor: "#C17F59",
    postType: "discussion",
  },
  {
    slug: "marketplace",
    name: "Marketplace",
    description:
      "Buy, sell, or trade Swedish books, course materials, and study resources.",
    icon: "shopping-bag",
    accentColor: "#8B7355",
    postType: "listing",
  },
  {
    slug: "off-topic",
    name: "Off Topic",
    description:
      "General chat, introductions, and anything that doesn't fit elsewhere.",
    icon: "message-circle",
    accentColor: "#8B8B8B",
    postType: "discussion",
  },
];
