// ----------------------------------------------------------------------

export default function Checkbox(theme) {
  return {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: '#007994',
          },
        },
      },
    },
  };
}
