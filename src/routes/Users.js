import React from 'react';
import { connect } from 'dva';
import styles from './Users.css';
import Users from '../components/Users/Users';
import MainLayout from '../components/MainLayout/MainLayout';


function UsersComponents({ location }) {
  return (

    <MainLayout location={location}>
      <div className={styles.normal}>
        <Users />
      </div>
    </MainLayout>
  );
}
export default connect()(UsersComponents);
