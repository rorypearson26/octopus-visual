"use client";
import {
  Badge,
  Button,
  Checkbox,
  createTheme,
  Paper,
  Radio,
  Select,
  Switch,
  TextInput,
} from "@mantine/core";

// This is where you will place the `octopusTheme` object.
export const octopusTheme = createTheme({
  // Define a custom color palette with 10 shades.
  // The colors are inspired by Octopus Energy's branding.
  colors: {
    // Primary green
    octopusGreen: [
      "#e6fcf5",
      "#c3f0e1",
      "#9fe4cf",
      "#7ad7bb",
      "#51cbb0",
      "#2fc0a6",
      "#22a98f",
      "#19806b",
      "#105a49",
      "#08372b",
    ],
    // Primary purple
    octopusPurple: [
      "#f5edff",
      "#e2d2f7",
      "#ceb7ef",
      "#b99be7",
      "#a580e0",
      "#8f62d9",
      "#7a4ad2",
      "#6333c9",
      "#4b1bc0",
      "#3408b7",
    ],
    // Dark blue for text and accents
    octopusDark: [
      "#f0f6ff",
      "#d8e7ff",
      "#b9d4ff",
      "#94c0ff",
      "#6eaeff",
      "#4999ff",
      "#2d84ff",
      "#0d6dfd",
      "#005ed6",
      "#0050bb",
    ],
  },

  // Set the primary color to the custom green
  primaryColor: "octopusGreen",

  // Use a modern sans-serif font, similar to their branding
  fontFamily: "Inter, sans-serif",

  // Apply rounded corners to all elements by default, matching the brand style
  defaultRadius: "md",

  // Customize the default props and styles for common components
  components: {
    Button: Button.extend({
      defaultProps: {
        variant: "filled",
        radius: "md",
        size: "lg",
      },
    }),
    Paper: Paper.extend({
      defaultProps: {
        shadow: "sm",
        p: "xl",
      },
    }),
    Badge: Badge.extend({
      defaultProps: {
        variant: "light",
      },
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        radius: "md",
        size: "md",
      },
    }),
    Select: Select.extend({
      defaultProps: {
        radius: "md",
        size: "md",
      },
    }),
    Switch: Switch.extend({
      defaultProps: {
        color: "octopusGreen",
      },
    }),
    Checkbox: Checkbox.extend({
      defaultProps: {
        color: "octopusGreen",
      },
    }),
    Radio: Radio.extend({
      defaultProps: {
        color: "octopusGreen",
      },
    }),
  },
});
