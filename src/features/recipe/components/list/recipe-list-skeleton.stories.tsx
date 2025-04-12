import type { Meta, StoryObj } from "@storybook/react";

import RecipeListSkeleton from "./recipe-list-skeleton";

const meta = {
  title: "recipe/skeleton/list",
  component: RecipeListSkeleton,
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
} satisfies Meta<typeof RecipeListSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
