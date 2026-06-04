export type SwedishLocation = {
  name: string;
  region: string;
  type: "city" | "region" | "island" | "area";
};

export const swedishLocations: SwedishLocation[] = [
  // Major cities
  { name: "Stockholm", region: "Stockholm", type: "city" },
  { name: "Gothenburg", region: "Västra Götaland", type: "city" },
  { name: "Malmö", region: "Skåne", type: "city" },
  { name: "Uppsala", region: "Uppsala", type: "city" },
  { name: "Linköping", region: "Östergötland", type: "city" },
  { name: "Västerås", region: "Västmanland", type: "city" },
  { name: "Örebro", region: "Örebro", type: "city" },
  { name: "Helsingborg", region: "Skåne", type: "city" },
  { name: "Norrköping", region: "Östergötland", type: "city" },
  { name: "Jönköping", region: "Jönköping", type: "city" },
  { name: "Umeå", region: "Västerbotten", type: "city" },
  { name: "Lund", region: "Skåne", type: "city" },
  { name: "Luleå", region: "Norrbotten", type: "city" },
  { name: "Gävle", region: "Gävleborg", type: "city" },
  { name: "Sundsvall", region: "Västernorrland", type: "city" },
  { name: "Karlstad", region: "Värmland", type: "city" },
  { name: "Växjö", region: "Kronoberg", type: "city" },
  { name: "Halmstad", region: "Halland", type: "city" },
  { name: "Kiruna", region: "Norrbotten", type: "city" },
  { name: "Visby", region: "Gotland", type: "city" },
  { name: "Kalmar", region: "Kalmar", type: "city" },
  { name: "Falun", region: "Dalarna", type: "city" },
  { name: "Östersund", region: "Jämtland", type: "city" },

  // Popular regions / areas
  { name: "Dalarna", region: "Dalarna", type: "region" },
  { name: "Gotland", region: "Gotland", type: "island" },
  { name: "Öland", region: "Kalmar", type: "island" },
  { name: "Swedish Lapland", region: "Norrbotten", type: "region" },
  { name: "Skåne", region: "Skåne", type: "region" },
  { name: "Bohuslän", region: "Västra Götaland", type: "region" },
  { name: "Småland", region: "Småland", type: "region" },
  { name: "Värmland", region: "Värmland", type: "region" },
  { name: "Abisko", region: "Norrbotten", type: "area" },
  { name: "Stockholm Archipelago", region: "Stockholm", type: "area" },
  { name: "West Coast", region: "Västra Götaland", type: "area" },
  { name: "High Coast", region: "Västernorrland", type: "area" },
];
