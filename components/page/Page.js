import PropTypes from 'prop-types';
import { HelmetProvider } from 'react-helmet-async';
import React, { forwardRef } from 'react';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const helmetContext = {};

// eslint-disable-next-line react/display-name
const Page = forwardRef(({ children, title = '', ...other }, ref) => (
  <Box ref={ref} {...other}>
    <HelmetProvider context={helmetContext}>
      <title>{title}</title>
    </HelmetProvider>
    {children}
  </Box>
));

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Page;
