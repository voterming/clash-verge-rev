# CONTRIBUTING

<<<<<<< HEAD
Thank you for your interest in contributing to **Clash Verge Rev**! This guide provides instructions to help you set up your development environment and start contributing effectively.

## Internationalization (i18n)

We welcome translations and improvements to existing locales. For details on contributing translations, please see [CONTRIBUTING_i18n.md](docs/CONTRIBUTING_i18n.md).

## Development Setup

Before contributing, you need to set up your development environment. Follow the steps below carefully.

### Prerequisites

1. **Install Rust and Node.js**  
   Our project requires both Rust and Node.js. Follow the official installation instructions [here](https://tauri.app/start/prerequisites/).

### Windows Users

> [!NOTE]  
> **Windows ARM users must also install [LLVM](https://github.com/llvm/llvm-project/releases) (including clang) and set the corresponding environment variables.**  
> The `ring` crate depends on `clang` when building on Windows ARM.

Additional steps for Windows:

- Ensure Rust and Node.js are added to your system `PATH`.

- Install the GNU `patch` tool.

- Use the MSVC toolchain for Rust:

```bash
=======
Thank you for your interest in contributing to Clash Verge Rev! This document provides guidelines and instructions to help you set up your development environment and start contributing.

## Development Setup

Before you start contributing to the project, you need to set up your development environment. Here are the steps you need to follow:

### Prerequisites

1. **Install Rust and Node.js**: Our project requires both Rust and Node.js. Please follow the instructions provided [here](https://tauri.app/v1/guides/getting-started/prerequisites) to install them on your system.

### Setup for Windows Users

If you're a Windows user, you may need to perform some additional steps:

- Make sure to add Rust and Node.js to your system's PATH. This is usually done during the installation process, but you can verify and manually add them if necessary.
- The gnu `patch` tool should be installed

When you setup `Rust` environment, Only use toolchain with `Windows MSVC` , to change settings follow command:

```shell
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
rustup target add x86_64-pc-windows-msvc
rustup set default-host x86_64-pc-windows-msvc
```

<<<<<<< HEAD
### Install Node.js Package Manager

Enable `corepack`:

```bash
corepack enable
```

### Install Project Dependencies

Node.js dependencies:

```bash
pnpm install
```

Ubuntu-only system packages:

```bash
sudo apt-get install -y libxslt1.1 libwebkit2gtk-4.1-dev libayatana-appindicator3-dev librsvg2-dev patchelf
```

### Download the Mihomo Core Binary (Automatic)

```bash
pnpm run prebuild
pnpm run prebuild --force  # Re-download and overwrite Mihomo core and service binaries
```

### Run the Development Server

```bash
pnpm dev           # Standard
pnpm dev:diff      # If an app instance already exists
pnpm dev:tauri     # Run Tauri development mode
=======
### Install Node.js Package

After installing Rust and Node.js, install the necessary Node.js and Node Package Manager:

```shell
npm install pnpm -g
```

### Install Dependencies

```shell
pnpm install
```

### Download the Clash Mihomo Core Binary

You have two options for downloading the clash binary:

- Automatically download it via the provided script:
  ```shell
  pnpm run check
  # Use '--force' to force update to the latest version
  # pnpm run check --force
  ```
- Manually download it from the [Clash Meta release](https://github.com/MetaCubeX/Clash.Meta/releases). After downloading, rename the binary according to the [Tauri configuration](https://tauri.app/v1/api/config#bundleconfig.externalbin).

### Run the Development Server

To run the development server, use the following command:

```shell
pnpm dev
# If an app instance already exists, use a different command
pnpm dev:diff
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
```

### Build the Project

<<<<<<< HEAD
Standard build:

```bash
pnpm build
```

Fast build for testing:

```bash
pnpm build:fast
```

### Clean Build

```bash
pnpm clean
```

### Portable Version (Windows Only)

```bash
pnpm portable
```

## Contributing Your Changes

### Before Committing

**Code quality checks:**

```bash
# Rust backend
cargo clippy-all
# Frontend
pnpm lint
```

**Code formatting:**

```bash
# Rust backend
cargo fmt
# Frontend
pnpm format
```

### Signing your commit

Signed commits are required to verify authorship and ensure your contributions can be merged. Reference signing-commits [here](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits).

### Submitting Your Changes

1. Fork the repository.

2. Create a new branch for your feature or bug fix.

3. Commit your changes with clear messages and make sure it's signed.

4. Push your branch and submit a pull request.

We appreciate your contributions and look forward to your participation!
=======
To build this project:

```shell
pnpm run build
```

The `Artifacts` will display in the `log` in the Terminal.

## Contributing Your Changes

Once you have made your changes:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with clear and concise commit messages.
4. Push your branch to your fork and submit a pull request to our repository.

We appreciate your contributions and look forward to your active participation in our project!
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
