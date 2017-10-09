import React from 'react';
import styles from './Users.css';
import { PAGE_SIZE } from '../../constants';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import UserModal from './UserModal';

function Users(props) {
  const { list: dataSource, total, page: current, dispatch, loading } = props;
  function createHandler(values) {
    dispatch({
      type: 'users/create',
      payload: values,
    });
  }
  function deleteHandler(id) {
    console.warn(`TODO: ${id}`);
    dispatch({
      type: 'users/remove',
      payload: id,
    });
  }
  function editHandler(id, values) {
    dispatch({
      type: 'users/patch',
      payload: { id, values },
    });
  }
  function pageChangedHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/users',
      query: { page },
    }));
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <UserModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>Edit</a>
          </UserModal>
          <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];
  const pagesize = PAGE_SIZE;
  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>
          <UserModal record={{}} onOk={createHandler}>
            <Button type="primary">Create User</Button>
          </UserModal>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.id}
          pagination={false}
          loading={loading}
        />
        <Pagination
          defaultCurrent={1}
          className="ant-table-pagination"
          total={parseInt(total, 10)}
          current={parseInt(current, 10)}
          pageSize={pagesize}
          onChange={pageChangedHandler}
        />
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  const { list, total, page } = state.users;
  return {
    list,
    total,
    page,
    loading: state.loading.models.users,
  };
}
export default connect(mapStateToProps)(Users);
