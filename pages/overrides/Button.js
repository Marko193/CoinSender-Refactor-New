// ----------------------------------------------------------------------

export default function Button(theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "12px",
          // background:
          //   'radial-gradient(circle farthest-corner at 10% 20%,#a1ffff 11.3%,#06ffff 41.2%,#00d8d8 77.8%)',
          // fontWeight: '600',
          background: "#007994",
          color: "white",
          "&:hover": {
            boxShadow: "none",
          },
        },

        sizeLarge: {
          height: 48,
        },
        containedInherit: {
          color: theme.palette.grey[800],
          // boxShadow: theme.customShadows.z8,
          "&:hover": {
            backgroundColor: theme.palette.grey[400],
          },
        },
        containedPrimary: {
          // boxShadow: theme.customShadows.primary,
        },
        containedSecondary: {
          // boxShadow: theme.customShadows.secondary,
        },
        outlinedInherit: {
          border: `1px solid ${theme.palette.grey[500_32]}`,
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        },
        outlined: {
          background: "white",
          color: "black",
          border: "1px solid #007994",
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
            border: `1px solid ${theme.palette.primary.dark}`,
            color: "white",
          },
        },
        textInherit: {
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
    },
  };
}
