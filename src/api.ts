import { Person } from "./types";
import data from "./data.json";
import { buildHighlightStr } from "./helper";

const mockData: Person[] = data.data;

export const searchByKeyword = async (keyword: string): Promise<Person[]> => {
  return new Promise((resolve) => {
    const filterData = mockData.map((d) => {
      const htmlName = buildHighlightStr(d.name, keyword);
      return { ...d, htmlName };
    });
    setTimeout(() => resolve(filterData), 1000);
  });
};
