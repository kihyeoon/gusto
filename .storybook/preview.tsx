import type { Preview } from "@storybook/react";
import { Open_Sans } from "next/font/google";
import React from "react";

import "../src/app/globals.css";

const fontSans = Open_Sans({ subsets: ["latin"], variable: "--font-sans" });

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className={`${fontSans.variable} font-sans`}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
