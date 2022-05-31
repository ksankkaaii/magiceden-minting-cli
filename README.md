Before you can use our CLI tool, you will need to install and operate a handful of developer tools.

WARNING
During this guide, we will use \ within example commands prior to new lines. On most shells (such as the shells on MacOS and Linux), this symbol means a new line. However, on Windows Command Prompt, it does not. If you are on Windows and are using the Command Prompt, enter the commands in a single line and remove the \ characters that we use in our examples.

Tooling required
node: JavaScript runtime
ts-node: TypeScript execution environment

Make sure you are using the ts-node.
ts-node --version

You will need to install the dependencies. From root directory:
npm install

Minting one token can be done using the command mint:
ts-node command/mint.ts mint \
    -p <CMV2 | MEL> \
    -k command/keypair.json \
    -m <Machine ID>