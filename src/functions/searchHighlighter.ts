export const highlightChar = (name: string, char: string) =>
  char === ""
    ? name
    : name.replace(
        new RegExp(char + "[ัิ-ฺ็-๎]*", "g"),
        (match) => `<span class="font-bold">${match}</span>`
      );
