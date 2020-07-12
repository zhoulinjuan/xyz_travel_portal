import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link, Card, Typography, CardContent } from '@material-ui/core';
import { navigate } from 'gatsby';

const DashBoardTableCard = (props) => {
  const { data, ...others } = props;
  return (
    <div>
      {data &&
        data.map &&
        data.map((values, i) => (
          <LabelCard
            {...others}
            values={values}
            key={values.applicationID || i}
          />
        ))}
    </div>
  );
};

DashBoardTableCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object)
};

export function LabelCard(props) {
  const { mapping, values } = props;

  const renderCell = (item) => {
    switch (item.type) {
      case 'link':
        return (
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              navigate(item.link);
            }}
            state={{ params: values['applicationId'] }}
          >
            {values[item.key]}
          </Link>
        );
      case 'time':
        const time = moment(values[item.key]).format('DD/MM/YYYY');
        return <span>{time}</span>;
      default:
        return <span>{values[item.key]}</span>;
    }
  };

  return (
    <Card>
      <CardContent>
        <div style={{ width: '90%' }}>
          {mapping.map((item) => (
            <Typography key={item.key}>
              {item.label && typeof item.label === 'string' && (
                <strong>{item.label + ': '}</strong>
              )}
              {renderCell(item)}
            </Typography>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

LabelCard.propTypes = {
  mapping: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.node,
      type: PropTypes.string,
      link: PropTypes.string,
      width: PropTypes.any
    })
  ).isRequired,
  values: PropTypes.object.isRequired
};

export default DashBoardTableCard;
