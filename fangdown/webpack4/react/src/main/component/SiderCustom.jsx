import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import styles from './SiderCustom.less';

const { Sider } = Layout;
export const menuWidth = 146;

class SiderCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getMenuUrl = (menuCode) => {
    let url;
    switch (menuCode) {
      case 'socialRecruitment':
        url = '/rctt/manage';
        break;
      case 'campusRecruitment':
        url = '/rctt/home-setting';
        break;
      case 'indexPage':
        url = '/rctt/home-setting';
        break;
      case 'settings':
        url = '/rctt/setting';
        break;
      default:
        break;
    }
    return url;
  }
  renderMenuItem = (item, level) => {
    const url = this.getMenuUrl(item.menuCode);
    return (
      <Menu.Item className={styles.left_bg} key={item.menuCode}>
        <Link to={url} >
          <span className="nav-text">{item.menuName}</span>
        </Link>
      </Menu.Item>
    );
  }

  renderMenu = (menuList) => {
    // 过滤校园招聘
    const filterMenuList = menuList && menuList.filter(item => item.menuCode !== 'campusRecruitment');
    return filterMenuList && filterMenuList.map((item) => {
      return this.renderMenuItem(item);
    });
  }
  render() {
    return (
      <div>
        <Sider
          style={{ minHeight: this.props.pageHeight, height: this.props.pageHeight }} // 这样写才兼容ie跟chrome
          className={`${styles.left_bg} left_menu_hi`}
          width={menuWidth}
        >
          <Menu
            className={styles.sider_children}
            mode="inline"
            defaultOpenKeys={this.state.defaultOpenKeys}
          >
            {
              this.renderMenu(this.props.menuList)
            }
          </Menu>

        </Sider>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    menuList: state.global.menuList,
  };
};
export default connect(mapStateToProps)(withRouter(SiderCustom));
