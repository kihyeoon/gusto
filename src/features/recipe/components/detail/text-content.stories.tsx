import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import TextContent from "./text-content";

const meta = {
  title: "recipe/textContent",
  component: TextContent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "300px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
} satisfies Meta<typeof TextContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    value: "",
    onChange: fn(),
    onDelete: fn(),
  },
};
