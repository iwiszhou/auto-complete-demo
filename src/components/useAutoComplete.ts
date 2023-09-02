import { useState } from "react";
import { searchByKeyword } from "../api";
import { Person } from "../types";
import data from "../data.json";

const mockData: Person[] = data.data;

function useAutoComplete() {
  const [error, setError] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nameList, setNameList] = useState<Person[]>(mockData);

  const handleSearch = async () => {
    try {
      if (error) {
        setError("");
      }
      setIsLoading(true);
      const response: Person[] = await searchByKeyword(keyword);
      setNameList(response);
    } catch (e) {
      setError(
        "Opps..we are not able to process your request right now. Please try later"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return [
    error,
    isLoading,
    nameList,
    keyword,
    setKeyword,
    handleSearch,
  ] as const;
}

export default useAutoComplete;
