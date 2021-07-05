# Contributing guidelines

## Before contributing

Welcome to [haztrak](https://github.com/dpgraham4401/haztrak)! Before sending your pull requests, make sure that you **read the whole guidelines**. If you have any doubt on the contributing guide, please feel free to [state it clearly in an issue](https://github.com/dpgraham4401/haztrak/issues/new)

## Contributing

We are very happy that you consider making e-Manifest easier to use! Being one of our contributors, you agree and confirm that:

- You did your work - plagiarism is not allowed.
  - Any plagiarized work will not be merged.
- Your work will be distributed under the [MIT](../LICENSE.md) once your pull request is merged
- Your submitted work must fulfill our styles and standards

**New implementation** is welcome! For example, refactoring, new solutions to a problem, different representations of outputs

**Improving documentation** and **writing good tests** are also highly welcome.

### Contribution

We appreciate any contribution, please read this section if you are contributing to your work.

~~If you submit a pull request that resolves an open issue, please help us 
to keep our issue list small by adding `fixes: #{$ISSUE_NO}` to your 
commit message. GitHub will use this tag to auto-close the issue if your PR is merged.~~

### What is an haztrak?

Simply put, haztrak is a package that helps users consume the EPA 
[e-Manifest](https://www.epa.gov/e-manifest) API. We're open to anything that forwards that goal. 
Just keep in mind, this project is developed by volunteers.

### Getting started
haztrak uses ECMAScript 6 syntax, including import/export, which became a core feature of node 13.2, if you have the LTS version of node or greater, you're set. And of course, [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/).
```bash
  $ node -v
  $ npm -v
```
clone the repo and install the development dependencies.
```bash
  $ git clone https://github.com/dpgraham4401/haztrak
  $ cd haztrak
  $ npm install
```
which will install a ton of npm packages.

Take a look at the coding style section below, if you're using vscode or another text editor outside of vim/nvim, consider a linter to enforce code style.

haztrak also uses [semantic releases](https://semantic-release.gitbook.io/semantic-release/) to automatically build and publish/release. your commits need to follow semantic release syntax, e.g.
```bash
  $ git commit -m "feat: new feature"
  $ git commit -m "docs: update to README.md"
```
commits with the ```fix:```, ```feat:```, or ```BREAKING CHANGE:``` prefix will trigger the GitHub CI environment which will automatically build, update the release version, and publish to the [npm registry](https://www.npmjs.com/package/haztrak).

haztrak uses [rollup](https://www.rollupjs.org/guide/en/), everything is
bundled via the `src/main.js`, and everything is made public from `./index.js`

### File Naming Convention
  - filenames should use the UpperCamelCase (PascalCase) style.
  - There should be no spaces in filenames.
 **Example:**`UserProfile.js` is allowed but `userprofile.js`,`Userprofile.js`,`user-Profile.js`,`userProfile.js` are not

### Testing

Be confident that your code works.
haztrak uses [mocha](https://mochajs.org/) to test run the codebase. 
If addingnew functionality, please include new mocha testing so we still have 
good dry run coverage. Don't let this scare you away, mocha has great documentation
and is easy to set up.

### Coding Style

To maximize the readability and correctness of our code, we require that 
new submissions follow [JavaScript Standard Style](https://standardjs.com/)
  - The modules package.json dev dependencies includes npm packages such as
[eslint](https://www.npmjs.com/package/eslint)

  - we understand you may prefer a less involved process such 
as the [Standardjs linter](https://standardjs.com/)
  - Command to  install JavaScript Standard Style
    ```bash
    $ npm install standard --save-dev
    ```
  - Usage
    ```bash
    $ standard MyFile.js  // if that fails, try: npx standard MyFile.js
    ```

- Use camelCase with the leading character as lowercase for identifier names (variables and functions)
- Names start with a letter
- follow code indentation
  - Always use 2 spaces for indentation of code blocks
    ```
    function sumOfArray (arrayOfNumbers) {
      let sum = 0
      for (let i = 0; i < arrayOfNumbers.length; i++) {
        sum += arrayOfNumbers[i]
      }
      return (sum)
    }

    ```
- Avoid using global variables and avoid '=='
- Please use 'let' over 'var', and const if the variable does not change
- Please use 'console.log()'
- We use ECMAScript 6
- Avoid importing external libraries for basic algorithms. Only use those 
libraries for complicated algorithms.
- Most importantly,
  - **Be consistent in the use of these guidelines when submitting.**
  - Happy coding!

Writer [@itsvinayak](https://github.com/itsvinayak), May 2020.

