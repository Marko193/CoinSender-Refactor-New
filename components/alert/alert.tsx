import { SxProps } from '@mui/material';
import { Alert } from '@mui/material';
import { useEffect } from 'react';

interface AlertProps {
  variant?: 'outlined' | 'filled' | 'standard';
  severity?: 'success' | 'info' | 'warning' | 'error';
  children: React.ReactNode;
  onClose: (() => void) | undefined;
  sx?: SxProps;
}

export const AlertComponent = ({
  variant = 'outlined',
  severity = 'success',
  children,
  onClose = undefined,
  sx,
}: AlertProps) => {
  useEffect(() => {
    setTimeout(() => onClose && onClose(), 5000);
    return () => {};
  }, []);

  return (
    <Alert sx={sx} onClose={onClose} variant={variant} severity={severity}>
      {children}
    </Alert>
  );
};
