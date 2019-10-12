## Installation

For all-platform developers:
1. Install NodeJS version 10.16.3 LTS from `https://nodejs.org`
2. Run `npm install -g expo-cli` to install `expo-cli`

For IOS developers:
3. Install `Watchman` from `https://facebook.github.io/watchman/docs/install.html`
4. Install IOS simulator according to `https://docs.expo.io`

## Project Structure
assets/
   All assets, including fonts, svgs, images, and other resources will be stored here.
actions/
   All redux actions will be stored here
reducers/
   All redux reducers will be stored here
components/
   All shared components, simple as a small button or complicated as a modal page, will
   be stored here. A rule of thumb - if a component is used twice, then it should be probably
   stored here.
navigation/
   All in-app routing logic will be stored here.
screens/
   All source code of pages will be stored here. Each screen may define a number of child
   components.
constants/
   All global constants, including string literals, magic numbers, and even theme constants
   will be stored here.
utils/
   All shared helper functions, including the not-yet-implemented graphical webGL functions,
   will be stored here.

## Dev Environment

Visual studio code is the official tool for the development, as it supports a myriad of extensions
that facilitates the development process. Following are some highly recommended extensions that
might make your life easier:

1. Eslint. Don't forget to do `npm install eslint` before installing the extensions as it requires
   the node module `eslint` to perform any syntax checking.

2. TabNine. A supreme handy extension to audo-complete syntax with the support of machine learning.

3. Prettier - Code formatter. Pretty self-explanatory tool to beautify your code. Add the following 
   to your `settings.json`: `"editor.formatOnSave": true`.

4. Flow language support.
