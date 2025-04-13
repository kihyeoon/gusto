import type { Meta, StoryObj } from "@storybook/react";

import IngredientContent from "./ingredient-content";

const meta = {
  title: "recipe/ingredientContent",
  component: IngredientContent,
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
} satisfies Meta<typeof IngredientContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    name: "마늘",
    amount: "1알",
    onChange: () => {},
    onDelete: () => {},
  },
};
