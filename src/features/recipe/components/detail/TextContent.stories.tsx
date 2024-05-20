import type { Meta, StoryObj } from "@storybook/react";

import TextContent from "./TextContent";

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
  },
};
