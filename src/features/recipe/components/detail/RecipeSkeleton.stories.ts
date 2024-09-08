import type { Meta, StoryObj } from "@storybook/react";

import RecipeSkeleton from "./RecipeSkeleton";

const meta = {
  title: "recipe/skeleton/detail",
  component: RecipeSkeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof RecipeSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
