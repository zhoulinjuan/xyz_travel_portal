import React from 'react';
import PropTypes from 'prop-types';
import DashBoardTableCard from './DashBoardTableCard';
import DashBoardTableLine from './DashBoardTableLine';
import MediaQuery from '../../../../components/MediaQuery';

const DashBoardTable = function (props) {
  const { data, ...others } = props;

  const proObj = {
    ...others,
    data
  };

  return (
    <MediaQuery>
      <DashBoardTableCard {...proObj} />
      <DashBoardTableLine {...proObj} />
    </MediaQuery>
  );
};

DashBoardTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object)
};

export default DashBoardTable;
