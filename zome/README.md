# Zome Developer Setup

This folder has an example DNA for the `transactor` zome. The actual code for the zome is in `zomes/transactor`.

To change the code, you can work either opening VSCode inside the root folder of the repo or in this folder, you should have rust intellisense either way.

All the instructions here assume you are running them inside the nix-shell at the root of the repository. For more info, see the [developer setup](/dev-setup.md).

## Building

```bash
CARGO_TARGET=target cargo build --release --target wasm32-unknown-unknown
hc dna pack transactor.dna.workdir
```

This should create a `transactor.dna.workdir/transactor-test.dna` file.

## Testing

After having built the DNA:

```bash
cd test
npm install
npm test
```

## Running

After having built the DNA:

```bash
hc s call register-dna --path zome/transactor.dna.workdir/transactor-test.dna
hc s call install-app <RESULT_HASH_OF_PREVIOUS_COMMAND>
hc s run
```

Now `holochain` will be listening at port `8888`;
