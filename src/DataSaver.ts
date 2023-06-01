import fs, { promises } from "fs";
import { DataContext } from "./DataRetriever/dataRetriever";
import { Person } from "./ts/types/Person";

export const DataSaver = {
  savePersonToFile: async (
    dataToSave: Person[],
    countFrom: number,
    countTill: number
  ) => {
    const fileName = `person_${countFrom}-${countTill}.json`;
    const path = `./savedData/person/${fileName}`;

    return new Promise((resolve, reject) => {
      fs.writeFile(path, JSON.stringify(dataToSave, null, 2), (error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve({
          path,
          fileName,
        });
      });
    });
  },
  saveDataToFile: async (
    dataToSave: Person[],
    countFrom: number,
    countTill: number,
    context: string
  ) => {
    const fileName = `${context}_${countFrom}-${countTill}.json`;
    const path = `./savedData/${context}/${fileName}`;

    return new Promise((resolve, reject) => {
      fs.writeFile(path, JSON.stringify(dataToSave, null, 2), (error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve({
          path,
          fileName,
        });
      });
    });
  },
  getSavedDataCount: async (context: DataContext): Promise<number> => {
    let highestCount = 0;
    const filenames = await promises.readdir(`./savedData/${context.filename}`);

    for (const filename of filenames) {
      const fromTillCount = filename.split(`${context.filename}_`)[1];
      const tillCount = parseInt(fromTillCount.split("-")[1]);
      if (tillCount > highestCount) {
        highestCount = tillCount;
      }
    }
	
    return highestCount;
  },
};
