import {
  describe,
  expect,
  test
} from "bun:test";

import {
  createToolGateway
} from "../src";

describe("ToolGateway", () => {

  test("register and execute tool", async () => {

    const gateway = createToolGateway();

    gateway.register({
      name: "add",

      execute(input: {
        a: number;
        b: number;
      }) {
        return input.a + input.b;
      }
    });

    const result =
      await gateway.execute<number>(
        "add",
        {
          a: 10,
          b: 20
        }
      );

    expect(result).toBe(30);
  });

});