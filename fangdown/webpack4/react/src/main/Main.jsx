import React, { Component } from 'react';
import { Layout } from 'antd';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Recruit from '@modules/rctt/Rctt.jsx';
import Pop from '@modules/pop/Pop';
import '@style/index.less';
import * as action from './Main.action';
import { getLoginUserInfo, getMenu } from './Main.api';
import SiderCustom from './component/SiderCustom';
import HeaderCustom from './component/HeaderCustom';
import styles from './Main.less';

const { Content } = Layout;
class Main extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
    };
  }
  componentDidMount = async () => {
    this.getUserInfo();
  }
  // 清除登录信息
  clearState = () => {
    this.props.actions.clearState();
  }
  loadMenu = async () => {
    const rs = await getMenu();
    if (rs && rs.data) {
      const menuList = rs.data;
      menuList.sort((a, b) => {
        return a.seq - b.seq > 0;
      });
      this.setState({ menuList });
      this.props.actions.saveMenuList(menuList);
    }
  }
  getUserInfo = async () => {
    const rs = await getLoginUserInfo();
    if (rs && rs.data) {
      const data = rs.data;
      const roles = data.roles && data.roles.map(item => item.roleNumber);
      // console.log(roles);
      const userInfo = {
        userId: data.userId,
        userName: data.name,
        roles: roles,
        wecruitId: (data.wecruit[0] && data.wecruit[0].wecruitId) || '',
        wecruitName: (data.wecruit[0] && data.wecruit[0].wecruitName) || ''
      };
      this.doSaveUserInfo(userInfo);
      this.loadMenu();
    }
  }
  // 保存用户信息
  doSaveUserInfo= (data) => {
    this.props.actions.saveUserInfo(data);
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    const { userInfo } = this.props;
    if (!userInfo) return null;
    return (
      <Layout className={styles.main}>
        <HeaderCustom
          toggle={this.toggle}
          collapsed={this.state.collapsed}
          userName={userInfo && userInfo.userName}
          clearState={this.clearState}
        />
        <Layout ref={(ref) => { this.mainLayoutRef = ref }} className={styles.layout}>
          <Switch>
            <Route
              path="/rctt"
              render={({ match }) => {
                return [
                  <SiderCustom
                    {...this.props}
                    key="slider"
                    collapsed={this.state.collapsed}
                  />,
                  <Content key="content"
                    className={styles.content}
                    style={{ height: this.props.pageHeight }}>
                    <Recruit match={match} />
                  </Content>,
                ];
              }
              }
            />
            <Route path="/pop" component={Pop} />
            <Redirect from="/" to="/login" />
          </Switch>
        </Layout>
      </Layout>
    );
  }
}
const mapStateToProps = (state) => {
  // console.log('state', state);
  return {
    userInfo: state.global.userInfo
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(action, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
