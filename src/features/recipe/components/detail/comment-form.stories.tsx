import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import CommentForm from "./comment-form";

const meta = {
  title: "recipe/commentForm",
  component: CommentForm,
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
} satisfies Meta<typeof CommentForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onSubmit: fn(),
  },
};
