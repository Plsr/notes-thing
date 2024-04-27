# DOM Maniputlation on static HTML files

I have a static `example.html` file that has a basic `html` structure in it.  
I want to parse it in `node.js` and manipulate the `DOM` elements in it.

## Parse the HTML file

We're using [node-html-parser](https://www.npmjs.com/package/node-html-parser) to parse the file

```js
const filePath = `path/to/file.html`;
const baseHtml = readFileSync(filePath);
const root = parse(baseHtml.toString());
```

## Manipulate the DOM

With the parsed HTML, we can now manipulate the DOM elements like in the browser

```js
const body = root.querySelector("body");
body.appendChild(parse(htmlContents));

writeFileSync(distFilePath, root.toString());
```

## Write the changed file

After we're done manipulating, we write the updated HTML back to the file

```js
writeFileSync(distFilePath, root.toString());
```
