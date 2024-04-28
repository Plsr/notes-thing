import { readdirSync, readFileSync, writeFileSync, copyFileSync, unlinkSync, } from "fs";
import { micromark } from "micromark";
import { parse } from "node-html-parser";
function main() {
    createHtmlFiles();
    createIdexPage();
}
main();
function createHtmlFiles() {
    const contentDir = "./content";
    const contentFiles = readdirSync(contentDir);
    contentFiles.forEach((file) => {
        const filePath = `${contentDir}/${file}`;
        const fileContents = readFileSync(filePath);
        const htmlContents = micromark(fileContents.toString());
        const fileName = file.split(".")[0];
        writeToHtmlFile(htmlContents, fileName);
    });
}
function writeToHtmlFile(htmlContents, fileName) {
    const distFilePath = `./dist/${fileName}.html`;
    copyFileSync("util/base.html", distFilePath);
    const baseHtml = readFileSync(distFilePath);
    const root = parse(baseHtml.toString());
    const body = root.querySelector("body");
    body.appendChild(parse(htmlContents));
    writeFileSync(distFilePath, root.toString());
}
function createIdexPage() {
    const distFilePath = "dist/index.html";
    unlinkSync(distFilePath);
    const indexPage = readFileSync("util/index_base.html");
    const root = parse(indexPage.toString());
    const ul = root.getElementById("list");
    const allHtmlFiles = readdirSync("dist");
    allHtmlFiles.forEach((htmlFile) => {
        const listItem = `<li><a href="${htmlFile}">${htmlFile.split(".")[0]}</a></li>`;
        ul.appendChild(parse(listItem));
    });
    writeFileSync(distFilePath, root.toString());
}
//# sourceMappingURL=convert.js.map