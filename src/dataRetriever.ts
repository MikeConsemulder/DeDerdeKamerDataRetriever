import { DataSaver } from "./DataSaver.js";

export type DataContext = {
  endpoint: string;
  filename: string;
};

type DataResponse = {
  ["@odata.context"]: string;
  value: any;
  ["@odata.nextLink"]: string;
};

type DataEndPoints = {
  persoon: string;
  persoonGeschenk: string;
  document: string;
};

export const contexts: { [context: string]: DataContext } = {
  persoon: {
    endpoint: "Persoon",
    filename: "persoon",
  },
  persoonsGeschenk: {
    endpoint: "PersoonGeschenk",
    filename: "persoonGeschenk",
  },
  document: {
    endpoint: "document",
    filename: "document",
  },
  persoonReis: {
    endpoint: "PersoonReis",
    filename: "persoonReis",
  },
  nevenFunctie: {
    endpoint: "PersoonNevenfunctie",
    filename: "nevenFunctie",
  },
  nevenFunctieInkomsten: {
    endpoint: "PersoonNevenfunctieInkomsten",
    filename: "nevenFunctieInkomsten",
  },
};

export class DataRetriever {
  private baseUrl = "https://gegevensmagazijn.tweedekamer.nl/OData/v4/2.0";

  private endPoints: DataEndPoints = {
    persoon: "Persoon",
    persoonGeschenk: "PersoonGeschenk",
    document: "document",
  };

  async getFraction() {
    const data = await fetch(this.baseUrl);
    const dataJson = await data.json();
    return dataJson;
  }

  async getPersonGift() {
    const data = await fetch(
      `${this.baseUrl}/${this.endPoints.persoonGeschenk}`
    );
    const dataJson = await data.json();
    return dataJson;
  }

  async getDataRecursive(
    skip: number = 0,
    context: DataContext,
    skipSavedData: Boolean = true
  ) {
    let skipAmount = skip;

    if (skipSavedData) {
      skipAmount = await DataSaver.getSavedDataCount(context);
    }

    const data = (await this.getData(
      skipAmount,
      context.endpoint
    )) as DataResponse;

    const nextCallSkip = skipAmount + data.value.length;

    if (data.value.length > 0) {
      const response = await DataSaver.saveDataToFile(
        data.value,
        skipAmount,
        nextCallSkip,
        context.filename
      );

      console.log("Response: ", response);
      this.getDataRecursive(nextCallSkip, context);
    }
  }

  async getData(skip: number = 0, endPoint: string) {
    const data = await fetch(`${this.baseUrl}/${endPoint}?$skip=${skip}`);
    const dataJson = await data.json();
    return dataJson;
  }
}
