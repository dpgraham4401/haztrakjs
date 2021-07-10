# Contributing guidelines

## Before contributing

Welcome to [haztrak](https://github.com/dpgraham4401/haztrak)! Before sending your pull requests, make sure that you **read the whole guidelines**. If you have any doubt on the contributing guide, please feel free to [state it clearly in an issue](https://github.com/dpgraham4401/haztrak/issues/new)

## Contributing

### Contributor

We are very happy that you consider implementing algorithms and data structures for others! This repository is referenced and used by learners from around the globe. Being one of our contributors, you agree and confirm that:

- You did your work - plagiarism is not allowed.
  - Any plagiarized work will not be merged.
- Your work will be distributed under the [MIT](../LICENSE.md) once your pull request is merged
- Your submitted work must fulfill our styles and standards

**New implementation** is welcome! For example, new solutions to a problem, different representations of a graph data structure or algorithm designs with different complexity.

**Improving comments** and **writing proper tests** are also highly welcome.

### Contribution

We appreciate any contribution, from fixing grammar mistakes to implementing 
complex algorithms. Please read this section if you are contributing to your work.


If you submit a pull request that resolves an open issue, please help us 
to keep our issue list small by adding `fixes: #{$ISSUE_NO}` to your 
commit message. GitHub will use this tag to auto-close the issue if your PR is merged.

#### What is an haztrak?

Simply put, haztrak is a package that helps users consume the e-Manifest API.
We're open to anything that does that, but as of now, this project is developed
by volunteers, just keep that in mind.

haztrak abides by K.I.S.S. Keep it simple. but nothing is off limits, please
feel free to contribute to the code base, documentation, anything.


#### File Naming Convention
  - filenames should use the UpperCamelCase (PascalCase) style.
  - There should be no spaces in filenames.
 **Example:**`UserProfile.js` is allowed but `userprofile.js`,`Userprofile.js`,`user-Profile.js`,`userProfile.js` are not

#### Testing

Be confident that your code works.
haztrak uses [mocha](https://mochajs.org/) to test run the codebase. 
If addingnew functionality, please include new mocha testing so we still have 
good dry run coverage. Don't let this scare you away, mocha has great documentation
and is easy to set up.

#### Other

haztrak uses [rollup](https://www.rollupjs.org/guide/en/), everything is
bundled via the `src/main.js`, and everything is made public from `./index.js`

haztrak also uses a CI environment with GitHub actions rollup changes in the CI 
before publishing to the npm registry where our users download from

#### Coding Style

To maximize the readability and correctness of our code, we require that 
new submissions follow [JavaScript Standard Style](https://standardjs.com/)
  - The modules package.json dev dependencies includes npm packages such as
[eslint](https://www.npmjs.com/package/eslint)

  - we understand you may prefer a less involved process such 
as the [Standardjs linter](https://standardjs.com/)
  - Command to  install JavaScript Standard Style
    ```
    $ npm install standard --save-dev
    ```
  - Usage
    ```
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

