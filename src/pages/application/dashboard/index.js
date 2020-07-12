import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { TableContainer, Paper, TableRow } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import * as actions from '../../../actions';
import DashBoardTable from '../_Components/DashboardTable';
import config from '../config.json';
import { isEmptyObject } from '../../../utils/helpers';
import Typography from '@material-ui/core/Typography';

const selector = ({ store, login }) => ({
  user: login.user,
  applicationList: store.applicationList,
  pagination: store.pagination
});

const useStyles = makeStyles((theme) => ({
  paginator: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

export default function DashBoard() {
  const dispatch = useDispatch();
  const { applicationList, pagination, user } = useSelector(selector);
  const [paginator, setPaginator] = useState({ currentPage: 1, pageSize: 10 });
  const [search, setSearch] = useState({});
  const classes = useStyles();

  //pagination callback
  const handlePageChange = (e) => {
    setPaginator((prev) => ({ ...prev, currentPage: e }));
  };

  useEffect(() => {
    if (user.role === 'company_admin') {
      setSearch({ uen: user.uen });
    }
  }, [user.uen, user.role]);

  useEffect(() => {
    dispatch(
      actions.requestAppList.request(search, paginator, user.applicantEmail)
    );
  }, [search, paginator, user.applicantEmail, dispatch]);

  return (
    <React.Fragment>
      {isEmptyObject(applicationList) ? (
        <Typography variant="h6" gutterBottom>
          Loading
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <DashBoardTable
            data={applicationList}
            mapping={config.tableMapping}
          />
          <TableRow className={classes.paginator}>
            <Pagination
              count={pagination.pageCount}
              page={pagination.currentPage}
              onChange={handlePageChange}
            />
          </TableRow>
        </TableContainer>
      )}
    </React.Fragment>
  );
}
