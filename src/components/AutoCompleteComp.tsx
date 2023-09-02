import { ChangeEvent } from "react";
import useAutoComplete from "./useAutoComplete";
import "./AutoCompleteComp.scss";

function AutoCompleteComp() {
  const [error, isLoading, nameList, keyword, setKeyword, handleSearch] =
    useAutoComplete();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <div className="auto-complete-comp">
      <div className="loader">{isLoading && "Loading......"}</div>
      {error && <div className="error-wrap">{error}</div>}

      <div className="keyword-input-wrap">
        <input value={keyword} onChange={handleInputChange} />
        <button onClick={handleSearch} disabled={isLoading}>
          Search
        </button>
      </div>

      <div className="name-wrap">
        {nameList.map((n) => (
          <div
            className="item"
            key={n.id}
            dangerouslySetInnerHTML={{ __html: n.htmlName }}
          />
        ))}
      </div>
    </div>
  );
}

export default AutoCompleteComp;
