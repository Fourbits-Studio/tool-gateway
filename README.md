# Tool Gateway

A lightweight, type-safe and extensible AI Tool Gateway for TypeScript, Node.js and Bun.

## Installation

### Bun
```bash
bun add @fourbits-studio/tool-gateway
```
### NPM 
```bash
npm install @fourbits-studio/tool-gateway
```

Usage

```ts
import {
  createToolGateway
} from "@fourbits-studio/tool-gateway";

const gateway = createToolGateway();

gateway.register({
  name: "hello",
  description: "Say hello",

  execute(input: {
    name: string
  }) {
    return {
      message: `Hello ${input.name}`
    };
  }
});

const result =
  await gateway.execute(
    "hello",
    {
      name: "White"
    }
  );

console.log(result);
```

### Runtime Support
- Bun
- Node.js
- TypeScript
- JavaScript

### License
MIT