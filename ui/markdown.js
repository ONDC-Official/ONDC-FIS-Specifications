fetch(
  "https://github.com/ONDC-Official/ONDC-FIS-Specifications/blob/draft-loan/README.md"
)
  .then((response) => response.text())
  .then((text) => {
    const parsedText = JSON.parse(text);
    const html = marked.parse(parsedText?.payload?.blob?.richText);
    document.getElementById("markdown-container").innerHTML = html;
  });
