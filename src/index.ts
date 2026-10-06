export interface ToolDefinition<TInput = unknown, TOutput = unknown> {
  name: string;
  description?: string;

  execute(input: TInput): Promise<TOutput> | TOutput;
}

export class ToolGateway {
  private tools = new Map<string, ToolDefinition>();

  register<TInput, TOutput>(
    tool: ToolDefinition<TInput, TOutput>,
  ): this {
    if (this.tools.has(tool.name)) {
      throw new Error(`Tool "${tool.name}" is already registered`);
    }

    this.tools.set(tool.name, tool as ToolDefinition);

    return this;
  }

  has(name: string): boolean {
    return this.tools.has(name);
  }

  list() {
    return Array.from(this.tools.values()).map((tool) => ({
      name: tool.name,
      description: tool.description,
    }));
  }

  async execute<TOutput = unknown>(
    name: string,
    input: unknown,
  ): Promise<TOutput> {
    const tool = this.tools.get(name);

    if (!tool) {
      throw new Error(`Tool "${name}" not found`);
    }

    return (await tool.execute(input)) as TOutput;
  }
}

export function createToolGateway() {
  return new ToolGateway();
}