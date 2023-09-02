import { buildHighlightStr } from "./helper";

it("should highlight first char only", () => {
  const str = "Hello jay";
  const keyword = "H";
  const expectedStr = "<div><span class='highlight'>H</span>ello jay</div>";
  expect(buildHighlightStr(str, keyword)).toEqual(expectedStr);
});

it("should highlight H if keyword is lower case h", () => {
  const str = "Hello jay";
  const keyword = "h";
  const expectedStr = "<div>Hello jay</div>";
  expect(buildHighlightStr(str, keyword)).toEqual(expectedStr);
});

it("should highlight last char only", () => {
  const str = "Hello jay";
  const keyword = "y";
  const expectedStr = "<div>Hello ja<span class='highlight'>y</span></div>";
  expect(buildHighlightStr(str, keyword)).toEqual(expectedStr);
});

it("should highlight in one char case", () => {
  const str = "K";
  const keyword = "K";
  const expectedStr = "<div><span class='highlight'>K</span></div>";
  expect(buildHighlightStr(str, keyword)).toEqual(expectedStr);
});

it("should not highlight in one char case", () => {
  const str = "K";
  const keyword = "z";
  const expectedStr = "<div>K</div>";
  expect(buildHighlightStr(str, keyword)).toEqual(expectedStr);
});

it("should not highlight if input str is ' '", () => {
  const str = " ";
  const keyword = "z";
  const expectedStr = "<div> </div>";
  expect(buildHighlightStr(str, keyword)).toEqual(expectedStr);
});

it("should not highlight if input str is empty", () => {
  const str = "";
  const keyword = "z";
  const expectedStr = "<div></div>";
  expect(buildHighlightStr(str, keyword)).toEqual(expectedStr);
});

it("should not highlight if input keyword is ' '", () => {
  const str = "z";
  const keyword = " ";
  const expectedStr = "<div>z</div>";
  expect(buildHighlightStr(str, keyword)).toEqual(expectedStr);
});

it("should not highlight if input keyword is empty", () => {
  const str = "z";
  const keyword = "";
  const expectedStr = "<div>z</div>";
  expect(buildHighlightStr(str, keyword)).toEqual(expectedStr);
});

it("should highlight nothing", () => {
  const str = "Hello jay";
  const keyword = "w";
  const expectedStr = "<div>Hello jay</div>";
  expect(buildHighlightStr(str, keyword)).toEqual(expectedStr);
});

it("should highlight the whole string", () => {
  const str = "Hello jay";
  const keyword = str;
  const expectedStr = "<div><span class='highlight'>Hello jay</span></div>";
  expect(buildHighlightStr(str, keyword)).toEqual(expectedStr);
});

it('should highlight "jay"', () => {
  const str = "Hello jay";
  const keyword = "jay";
  const expectedStr = "<div>Hello <span class='highlight'>jay</span></div>";
  expect(buildHighlightStr(str, keyword)).toEqual(expectedStr);
});

it('should highlight " "', () => {
  const str = "Hello jay";
  const keyword = " ";
  const expectedStr = "<div>Hello<span class='highlight'> </span>jay</div>";
  expect(buildHighlightStr(str, keyword)).toEqual(expectedStr);
});

it('should highlight "ll"', () => {
  const str = "Hello jay";
  const keyword = "ll";
  const expectedStr = "<div>He<span class='highlight'>ll</span>o jay</div>";
  expect(buildHighlightStr(str, keyword)).toEqual(expectedStr);
});

it('should highlight "ll" in 2 places', () => {
  const str = "Hello ellie";
  const keyword = "ll";
  const expectedStr =
    "<div>He<span class='highlight'>ll</span>o e<span class='highlight'>ll</span>ie</div>";
  expect(buildHighlightStr(str, keyword)).toEqual(expectedStr);
});

it('should highlight "l" in 4 places', () => {
  const str = "Hello ellie";
  const keyword = "l";
  const expectedStr =
    "<div>He<span class='highlight'>l</span><span class='highlight'>l</span>o e<span class='highlight'>l</span><span class='highlight'>l</span>ie</div>";
  expect(buildHighlightStr(str, keyword)).toEqual(expectedStr);
});
