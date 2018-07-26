import React, { Component } from 'react';
import { Layout, Popover } from 'antd';
import rwManImg from '@images/rw-man.png';
import styles from './HeaderCustom.less';
import { logout } from '../Main.api';
/** 头部的高度 */
export const headerHeight = 60;
const { Header } = Layout;
class HeaderCustom extends Component {
  logout = async () => {
    const rs = await logout();
    if (rs) {
      this.props.clearState();
      window.location.href = '/#/login';
    }
  }
  render() {
    const { userName } = this.props;
    const title = '';
    const content = <a onClick={this.logout}>退出</a>;
    return (
      <Header style={{ height: headerHeight }} className={styles.header_sd}>
        <a href={`/#/`}><div className="logo" /></a>
        <div className={styles.img_rwman}>
          <p>
            <span className={styles.name_text}>{userName}</span>
            <Popover placement="bottomRight" title={title} content={content}>
              <img src={rwManImg} alt="" />
            </Popover>
          </p>
        </div>
      </Header>
    );
  }
}


export default HeaderCustom;

