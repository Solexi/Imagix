import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#000000', // Set the background color to black (#000000)
        color: 'white', // Text color
      },
    },
  },
  fonts: {
    // Define custom fonts here if needed
    heading: 'Helvetica, sans-serif',
    body: 'Arial, sans-serif',
  },
  components: {
    // Customize Chakra UI components as needed
    Button: {
      baseStyle: {
        // Define custom button styles here
        fontWeight: 'bold', // Example: Set the default font weight to bold
        borderRadius: '8px', // Example: Add rounded corners to buttons
      },
      // Add other button variants (e.g., primary, secondary) as needed
      primary: {
        // Example: Customize the primary button variant
        bg: 'blue.500', // Set the background color for the primary button
        color: 'white', // Set the text color for the primary button
      },
      // Define more button variants as needed
    },
  },
  breakpoints: {
    // Define breakpoints for responsive design
    base: "0em", //0px
    sm: '30em', // Small screens (e.g., mobile phones) ~480px
    md: '48em', // Medium screens (e.g., tablets) ~768px
    lg: '62em', // Large screens (e.g., desktops) ~992px
    xl: '80em', // Extra-large screens ~1280px
    "2xl": "96em", // ~1536px
  },
  
//   config: {
//   }
});

export default theme;
