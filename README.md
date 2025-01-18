# Team 2480

A [dreamland.js](https://dreamland.js.org/) website for FRC Team 2480, with a **bespoke server side rendering solution** to be friendly to search engines.

## How to install

### Prerequisites
- The git repo cloned in a directory
- [NPM, and Node.js installed](https://nodejs.org/)

### Installation

In the repo directory install pnpm:
```sh
npm install -g pnpm
```
>pnpm is preferred over npm because its faster and its lock file is being tracked. Both technically work, dont track a npm lock file please.

Then install the required packages:
```sh
pnpm install
```

Then run this command to open the website!:
(Press ctrl+c to stop the server.)
```sh
pnpm run dev
```
>all additional pnpm commands in use are listed under the scripts key in package.json

## Editing large amounts of text
Frequently edited portions of the site such as the links section are provided as markdown files in the team manual repository. If you are not a programmer you can add changes to the text of our site by editing the corresponding markdown file in github.

## Troubleshooting

Flag a senior programmer down, or ask ChatGPT :P
