## Installation

For all-platform developers:

1. Install NodeJS version 10.16.3 LTS from `https://nodejs.org`
2. Run `npm install -g expo-cli` to install `expo-cli`

For IOS developers:

3. Install `Watchman` from `https://facebook.github.io/watchman/docs/install.html`
4. Install IOS simulator according to `https://docs.expo.io`
5. Run `npm install` to install the necessary dependencies
6. Run `npm start`. This will call `expo start`. Bear in the mind we should choose `ios` when being asked.
   If everything goes well, it should start your IOS emulator.

## Project Structure

assets/ <br>
All assets, including fonts, svgs, images, and other resources will be stored here.

actions/ <br>
All redux actions will be stored here

reducers/ <br>
All redux reducers will be stored here

components/ <br>
All shared components, simple as a small button or complicated as a modal page, will
be stored here. A rule of thumb - if a component is used twice, then it should be probably
stored here.

navigation/ <br>
All in-app routing logic will be stored here.

screens/ <br>
All source code of pages will be stored here. Each screen may define a number of child
components.

constants/ <br>
All global constants, including string literals, magic numbers, and even theme constants
will be stored here.

utils/ <br>
All shared helper functions, including the not-yet-implemented graphical webGL functions,
will be stored here.

App.js <br>
The entry to the program.

Store.js <br>
The very base of the redux store.

## Dev Environment

Visual studio code is the official tool for the development, as it supports a myriad of extensions
that facilitates the development process. Following are some highly recommended extensions that
might make your life easier:

1. Eslint (Deprecated). If eslint cannot start normally, try installing `eslint` and `babel-eslint`.
   You may also allow eslint to format on save in user settings. The rules for eslinter live in the file
   `eslintrc.json`.

2. TabNine. A supreme handy extension to audo-complete syntax with the support of machine learning.

3. Prettier - Code formatter. Pretty self-explanatory tool to beautify your code. Add the following
   to your `settings.json`: `"editor.formatOnSave": true`.

4. Tslint. This project uses typescript that supports compile-time type-checking.
