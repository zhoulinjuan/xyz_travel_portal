import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DftMediaQuery from 'react-responsive';

const MediaQuery = function ({ children }) {
  return (
    <Fragment>
      <DftMediaQuery maxWidth="45rem">{children && children[0]}</DftMediaQuery>
      <DftMediaQuery minWidth="45rem">{children && children[1]}</DftMediaQuery>
    </Fragment>
  );
};

MediaQuery.propTypes = {
  children: PropTypes.node
};

export default MediaQuery;
