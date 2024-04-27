import { readdirSync, readFileSync, writeFileSync, copyFileSync } from "fs";
import { micromark } from "micromark";
import { parse } from "node-html-parser";

const contentDir = "./content";
const contentFiles = readdirSync(contentDir);

contentFiles.forEach((file) => {
  const filePath = `${contentDir}/${file}`;

  const fileContents = readFileSync(filePath);

  const htmlContents = micromark(fileContents.toString());
  const fileName = file.split(".")[0];
  writeToHtmlFile(htmlContents, fileName);
});

function writeToHtmlFile(htmlContents: string, fileName: string) {
  const distFilePath = `./dist/${fileName}.html`;

  copyFileSync("util/base.html", distFilePath);
  const baseHtml = readFileSync(distFilePath);

  const root = parse(baseHtml.toString());

  const body = root.querySelector("body");

  body.appendChild(parse(htmlContents));

  writeFileSync(distFilePath, root.toString());
}
