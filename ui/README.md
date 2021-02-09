# UI Developer Setup

UI module for the `transactor` zome.

## Local Demo with `@web/dev-server`

First, [build the holochain dna](/zomes/README.md). 

To run the alice player:

```bash
npm run start-alice
```

To run the bob player:

```bash
npm run start-bob
```

Now this two players can interact throught their UI.

This runs a local development server that serves the basic demo located in `ui/demo/index.html`

## Building

```bash
npm run build
```

## Testing with Karma

To run the suite of karma tests, run

```bash
npm run test
```

To run the tests in watch mode (for <abbr title="test driven development">TDD</abbr>, for example), run

```bash
npm run test-watch
```

## E2E tests

First, [build the holochain dna](/zomes/README.md).

```bash
npm run e2e
```

Take into account that this will run the holochain conductor in the background to perform the tests.

## Demoing with Storybook

To run a local instance of Storybook for your component, run

```bash
npm run storybook
```

To build a production version of Storybook, run

```bash
npm run build-storybook
```

## Linting with ESLint

To scan the project for linting errors, run

```bash
npm run lint
```

To automatically fix many linting errors, run

```bash
npm run format
```

## Publishing to npm

```bash
npm run publish-npm
```

This will build the application, copy the `README.md`, `LICENSE` and `package.json` to the `dist` folder and publish that.

## Publishing storybook documentation to Github Pages

```bash
npm run publish-storybook
```

This will build the static storybook site, and deploy it directly in the `gh-pages` of your repository.

After this, it will be accessible in the appropriate Github Pages URL (eg. https://llavors-mutues.github.io/public-transactor).

## Publishing in a branch on this repository

If you don't want to publish to NPM yet, you can "publish" a build of this module with:

```bash
npm run publish-to-branch
```

Now, a built version of this module will be at the root of the `ui-build` branch, which other `package.json` files can reference like this:

```json
  "dependencies": {
    "@llavors-mutues/public-transactor": "llavors-mutues/public-transactor#ui-build",
  }
```