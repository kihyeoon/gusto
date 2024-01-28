import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "shadcn/button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    children: "button",
  },
};

export const Secondary: Story = {
  args: {
    children: "button",
    variant: "secondary",
  },
};

export const Outline: Story = {
  args: {
    children: "button",
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    children: "button",
    variant: "ghost",
  },
};

export const Link: Story = {
  args: {
    children: "button",
    variant: "link",
  },
};

export const Destructive: Story = {
  args: {
    children: "button",
    variant: "destructive",
  },
};
