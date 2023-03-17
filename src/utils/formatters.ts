import { GoalDescription } from "@/types";

export const getGoalsByResponseString = (
  generatedResponse: string
): Array<string> => {
  const listOfGoals = generatedResponse
    .replace(/[0-9]{1,2}\. /g, "")
    .split("\n")
    .map((goal) => goal.trim())
    .filter((goal: string) => goal.length > 6)
  return listOfGoals;
};

export const goalsToHTML = (goalDescriptions: Array<GoalDescription>): string => {
  return `
    <table style="max-width:100%; min-width:100%;" class="mcnTextContentContainer" width="100%" cellspacing="0" cellpadding="0" border="0" align="left">
      <tbody>
        <tr>
          <td class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;" valign="top">
            ${goalDescriptions.map(({ goal, description }) => {
              return (`
                <h3 class="SustainabilityDescriptions_goalHeading__sT6qH">
                  <span style="color:#4BB29E">
                    <span style="font-size:18px">
                      <span style="font-family:merriweather sans,helvetica neue,helvetica,arial,sans-serif">${goal}</span>
                    </span>
                  </span>
                </h3>
                <span style="font-size:15px">
                  <span style="font-family:merriweather sans,helvetica neue,helvetica,arial,sans-serif">${description}</span>
                </span>
                <br>
              `);
            }).join('<br>')}
          </td>
      </tr>
    </tbody>
  </table>`;
}
