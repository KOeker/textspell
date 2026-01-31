# textspell

![npm version](https://img.shields.io/npm/v/textspell.svg)
![npm downloads](https://img.shields.io/npm/d18m/textspell)
![node current](https://img.shields.io/node/v/textspell)
![node support](https://img.shields.io/badge/node-up_to_v22-brightgreen)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

A powerful CLI tool for automatic placeholder replacement with generated Lorem Ipsum text in your files.

## ✨ Features

- 🔄 **Automatic Placeholder Replacement**: Replace placeholders like `LOREM 200` with generated text
- 📝 **Flexible Configuration**: Define custom placeholders and text lengths
- 🌍 **Multi-Language Support**: Support for different languages (including Turkish)
- 💾 **Backup Function**: Automatic backup copies before changes
- 🎯 **Glob Patterns**: Scan multiple files with pattern matching
- ⚡ **Dry-Run Mode**: Test changes without overwriting files

## 📦 Installation

### Global

```bash
npm install -g textspell
```

### Local (per project)

```bash
npm install --save-dev textspell
```

## 🚀 Usage

### Initialize Config File

Create a `textspell.config.json` configuration file in your project:

```bash
textspell init
```

This creates a default configuration file that you can customize to your needs.

### Replace Placeholders

```bash
textspell
```

oder mit npx:

```bash
npx textspell
```

## 📋 Examples

### In Your Files

```javascript
// Before:
const description = "LOREM 50";
const longText = "DESC 120";
const turkishText = "TURKISH_LOREM 80";

// After (after running textspell):
const description = "Lorem ipsum dolor sit amet consectetur adipiscing elit...";
const longText = "Lorem ipsum dolor sit amet consectetur adipiscing...";
const turkishText = "Sed ut perspiciatis unde omnis iste natus error...";
```

### Placeholder Syntax

You can use placeholders **with or without a number**:

```javascript
// With number - uses specified amount:
const text = 'LOREM 40';         // → 40 words
const desc = 'DESC 200';         // → 200 words
const chars = 'LOREM_CHARS 500'; // → 500 characters

// Without number - uses default from config:
const text = 'LOREM';            // → 50 words (default)
const desc = 'DESC';             // → 120 words (default)
const chars = 'LOREM_CHARS';     // → 200 characters (default)
```

**Syntax Overview:**

```
LOREM 200        → 200 words Lorem Ipsum
LOREM            → 50 words (default from config)
DESC 120         → 120 words description text
DESC             → 120 words (default from config)
LOREM_CHARS 500  → 500 characters
LOREM_CHARS      → 200 characters (default from config)
TURKISH_LOREM 80 → 80 Turkish Lorem Ipsum words
TURKISH_LOREM    → 80 words (default from config)
```

## ⚙️ Configuration

### Config File (textspell.config.json)

The configuration file is automatically loaded if it exists in your project directory.

**Option 1: Using init command (recommended)**

```bash
textspell init
```

**Option 2: Manual creation**

Create a `textspell.config.json` file in your project directory:

```json
{
  "paths": [
    "src/**/*.js",
    "src/**/*.ts",
    "public/**/*.html",
    "README.md"
  ],
  "keys": {
    "LOREM": { "type": "words", "default": 50 },
    "LOREM_CHARS": { "type": "chars", "default": 200 },
    "DESC": { "type": "words", "default": 120 }
  },
  "custom": {
    "TURKISH_LOREM": {
      "type": "words",
      "language": "tr",
      "default": 80
    }
  },
  "options": {
    "dryRun": false,
    "backup": false,
    "verbose": true
  }
}
```

### Configuration Options

#### paths
Array of glob patterns that define which files should be scanned.

```json
"paths": [
  "src/**/*.js",
  "src/**/*.ts",
  "public/**/*.html"
]
```

#### keys
Pre-defined placeholders with default values.

```json
"keys": {
  "LOREM": { "type": "words", "default": 50 },
  "LOREM_CHARS": { "type": "chars", "default": 200 }
}
```

#### custom
Your own custom placeholders.

```json
"custom": {
  "MY_TEXT": {
    "type": "words",
    "language": "en",
    "default": 100
  }
}
```

#### options
General options for the tool.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `dryRun` | boolean | `false` | Shows changes only, without overwriting files |
| `backup` | boolean | `true` | Creates `.bak` backup files before changes |
| `verbose` | boolean | `true` | Shows detailed output during processing |

## 📊 Placeholder Types

| Type | Description | Example |
|------|-------------|---------|
| `words` | Generates a specific number of words | `LOREM 50` → 50 words |
| `chars` | Generates a specific number of characters | `LOREM_CHARS 200` → 200 characters |

## 🔄 Workflow

1. **Initialize**: Run `textspell init` to create a configuration file
2. **Customize**: Edit `textspell.config.json` according to your needs
3. **Add Placeholders**: Insert placeholders in your files (e.g. `LOREM 100`)
4. **Execute**: Run `textspell` to replace all placeholders
5. **Review**: Backup files (`.bak`) allow rollback if needed

## 📄 Requirements

- Node.js >= 16.0.0
- npm >= 7.0.0

## 📝 License

MIT License