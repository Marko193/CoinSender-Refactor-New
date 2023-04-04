import PropTypes from 'prop-types';
// icons
import { Icon } from '@iconify/react';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Iconify.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object
};
// @ts-ignore
export default function Iconify({ icon, ...other }) {
  // @ts-ignore
  return <Box component={Icon} icon={icon} {...other} />;
}
