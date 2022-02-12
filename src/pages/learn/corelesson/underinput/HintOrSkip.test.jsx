import { calculateHintInput } from "./HintButton";
import * as utils from "../../utils";

describe("Tests calculateHintInput", () => {
  jest
    .spyOn(utils, "getCurrentQuestion")
    .mockImplementation(() => ({ answer: "Answer" }));

  it("Should return input if input=answer", () => {
    expect(calculateHintInput("Answer")).toBe("Answer");
  });
  it("Should return the first character of answer if the input is totally wrong", () => {
    expect(calculateHintInput("pukeface")).toBe("A");
  });
  it("Should return 'A' for ''", () => {
    expect(calculateHintInput("")).toBe("A");
  });
  it("Should return 'An' for 'A'", () => {
    expect(calculateHintInput("A")).toBe("An");
  });
  it("Should return 'An' for 'Abswer'", () => {
    expect(calculateHintInput("Abswer")).toBe("An");
  });
  it("Should return 'Answer' for 'Answe'", () => {
    expect(calculateHintInput("Answe")).toBe("Answer");
  });
});
