import { Alert } from '@mui/material';

interface AlertProps {
  variant?: 'outlined' | 'filled' | 'standard';
  severity?: 'success' | 'info' | 'warning' | 'error';
  children: React.ReactNode;
  onClose: () => void;
}

export const AlertComponent = ({
  variant = 'outlined',
  severity = 'success',
  children,
  onClose,
}: AlertProps) => {
  return (
    <Alert onClose={onClose} variant={variant} severity={severity}>
      {children}
    </Alert>
  );
};
