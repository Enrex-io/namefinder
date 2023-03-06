export const getGoalsByResponseString = (
  generatedResponse: string
): Array<string> => {
  const listOfGoals = generatedResponse
    .replace(/[0-9]{1,2}\. /g, "")
    .split("\n")
    .filter((goal: string) => goal !== "");
  return listOfGoals;
};
