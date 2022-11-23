import fs from "fs";
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
};
