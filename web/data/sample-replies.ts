export type SampleReply = {
  id: string;
  postId: string;
  content: string;
  heartCount: number;
  createdAt: string;
  author: {
    displayName: string;
    currentLevel: string;
  };
};

export const sampleReplies: SampleReply[] = [
  {
    id: "r1",
    postId: "1",
    content:
      "Try Slottsskogen to Skatås! It's a gorgeous trail through the forest and you can take tram 1 or 2 to get to the start. About 8 km round trip.",
    heartCount: 12,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    author: { displayName: "Erik J.", currentLevel: "C1" },
  },
  {
    id: "r2",
    postId: "1",
    content:
      "Änggårdsbergen is amazing too — it connects to the botanical garden. Very easy to reach by bus. Pack a fika and enjoy the views!",
    heartCount: 8,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    author: { displayName: "Lisa F.", currentLevel: "B2" },
  },
  {
    id: "r3",
    postId: "1",
    content:
      "If you don't mind a short bus ride, Vättlefjäll nature reserve is incredible. Much less crowded than trails closer to the city center.",
    heartCount: 5,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    author: { displayName: "Anders P.", currentLevel: "C1" },
  },
  {
    id: "r4",
    postId: "4",
    content:
      "The general rule: 'i' for enclosed spaces and countries/cities, 'på' for surfaces, islands, and institutions. So 'i Stockholm' (city) but 'på Gotland' (island). 'I skolan' works because you're thinking of being inside the building, while 'på universitetet' treats it as an institution.",
    heartCount: 31,
    createdAt: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000).toISOString(),
    author: { displayName: "Karin S.", currentLevel: "C1" },
  },
  {
    id: "r5",
    postId: "4",
    content:
      "Don't worry, even native speakers sometimes hesitate! The institution vs. building distinction is the key. 'Jag är på sjukhuset' (I'm at the hospital as an institution) vs 'Jag är i sjukhuset' (I'm inside the building).",
    heartCount: 18,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    author: { displayName: "Nils H.", currentLevel: "B2" },
  },
  {
    id: "r6",
    postId: "7",
    content:
      "Pro tip: bring your passport AND your coordination number letter when you go to the bank. Some banks won't open an account without both. I had to go back twice!",
    heartCount: 22,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    author: { displayName: "Marco T.", currentLevel: "A2" },
  },
  {
    id: "r7",
    postId: "2",
    content:
      "Tack så mycket! Made these last weekend and they were perfekt. The cold butter tip really does make a difference. My Swedish colleagues couldn't believe I made them from scratch.",
    heartCount: 15,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    author: { displayName: "Sam W.", currentLevel: "A1" },
  },
];
