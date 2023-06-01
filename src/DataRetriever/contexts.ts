import { DataContext } from "./dataRetriever";

export const keyIndex = 0;
export const contextIndex = 1;

export const contexts: Map<string, DataContext> = new Map([
  [
    "persoon",
    {
      endpoint: "Persoon",
      filename: "persoon",
    },
  ],
  [
    "persoonsGeschenk",
    {
      endpoint: "PersoonGeschenk",
      filename: "persoonGeschenk",
    },
  ],
  [
    "persoonReis",
    {
      endpoint: "PersoonReis",
      filename: "persoonReis",
    },
  ],
  [
    "nevenFunctie",
    {
      endpoint: "PersoonNevenfunctie",
      filename: "nevenFunctie",
    },
  ],
  [
    "nevenFunctieInkomsten",
    {
      endpoint: "PersoonNevenfunctieInkomsten",
      filename: "nevenFunctieInkomsten",
    },
  ],
  [
    "fractiezetelpersoon",
    {
      endpoint: "FractieZetelPersoon",
      filename: "fractieZetelPersoon",
    },
  ],
  [
    "fractiezetel",
    {
      endpoint: "FractieZetel",
      filename: "fractiezetel",
    },
  ],
  [
    "fractie",
    {
      endpoint: "Fractie",
      filename: "fractie",
    },
  ],
]);
