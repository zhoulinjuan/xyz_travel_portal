import React, { Fragment, isValidElement } from 'react';
import PropTypes from 'prop-types';
import {
  TableHead,
  Table,
  TableContainer,
  TableCell,
  TableRow,
  Link
} from '@material-ui/core';
import { navigate } from 'gatsby';
import moment from 'moment';

const DashBoardTableLine = (props) => {
  const { data, mapping, ...others } = props;

  return (
    <Table>
      <TableHead>
        <TableRow>
          {mapping.map((item) => {
            return (
              <TableCell key={item.key} width={item.width}>
                {isValidElement(item.label)
                  ? React.cloneElement(item.label, { ...others })
                  : item.label}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
      <tbody>
        {data && data.map && data.length ? (
          data.map((item) => (
            <OrgTableRow
              key={item.applicationId}
              mapping={mapping}
              values={item}
            />
          ))
        ) : (
          <TableContainer type="desktop" length={mapping.length}>
            No record found
          </TableContainer>
        )}
      </tbody>
    </Table>
  );
};

DashBoardTableLine.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  mapping: PropTypes.arrayOf(PropTypes.object).isRequired
};

const OrgTableRow = (props) => {
  const { mapping, values } = props;

  const renderCell = (item) => {
    switch (item.type) {
      case 'link':
        return (
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              navigate(item.link + '?applicationId=' + values['applicationId']);
            }}
            state={{ params: values['applicationId'] }}
            title={values[item.key]}
          >
            {values[item.key]}
          </Link>
        );
      case 'time':
        const time = moment(values[item.key]).format('DD/MM/YYYY');
        return <span title={time}>{time}</span>;
      default:
        return <span title={values[item.key]}>{values[item.key]}</span>;
    }
  };

  return (
    <Fragment>
      <TableRow>
        {mapping.map((item) => (
          <TableCell key={item.key} nowrap>
            {renderCell(item)}
          </TableCell>
        ))}
      </TableRow>
    </Fragment>
  );
};

OrgTableRow.propTypes = {
  mapping: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.node,
      type: PropTypes.string,
      width: PropTypes.any
    })
  ).isRequired,
  values: PropTypes.object.isRequired
};

export default DashBoardTableLine;
