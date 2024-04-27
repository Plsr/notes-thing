# Notes

My working notes. They're rough by design.

## How it works

- content goes into the `content` folder, in the `.md` format
- `lib/convert.js` reads the content folder, converts every `.md` file to `.html` and writes it to the `dist` folder, using the `util/base.html` file as a template (might actually need this later on)

## TODO

- [ ] Add github actions to publish this on Github Pages
- [ ] Add metadata
- [ ] Add a proper index.html
