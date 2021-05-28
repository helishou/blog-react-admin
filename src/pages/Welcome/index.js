import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Row, Col, List, Avatar } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './Welcome.less';

@connect(({ user, activities, loading }) => ({
  currentUser: user.currentUser,
  activities,
  currentUserLoading: loading.effects['user/fetchCurrent'],
}))
class Welecome extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
    this.image = this.getImage();
    // dispatch({
    //   type: 'activities/fetchList',
    // });
  }

  componentWillUnmount() {}

  getImage = () => {
    const number = Math.ceil(Math.random() * 697);
    return `http://cdn.jsdelivr.net/gh/uxiaohan/GitImgTypecho/Acg/api.vvhan.com[${number}].jpg?s=1920*1080`;
  };

  renderActivities() {
    const {
      activities: { list },
    } = this.props;
    return list.map(item => {
      const events = item.template.split(/@\{([^{}]*)\}/gi).map(key => {
        if (item[key]) {
          return (
            <a href={item[key].link} key={item[key].name}>
              {item[key].name}
            </a>
          );
        }
        return key;
      });
      return (
        <List.Item key={item.id}>
          <List.Item.Meta
            avatar={<Avatar src={item.user.avatar} />}
            title={
              <span>
                <a className={styles.username}>{item.user.name}</a>
                &nbsp;
                <span className={styles.event}>{events}</span>
              </span>
            }
            description={
              <span className={styles.datetime} title={item.updatedAt}>
                {moment(item.updatedAt).fromNow()}
              </span>
            }
          />
        </List.Item>
      );
    });
  }

  render() {
    const { currentUser, currentUserLoading } = this.props;

    const pageHeaderContent =
      currentUser && Object.keys(currentUser).length ? (
        <div className={styles.pageHeaderContent}>
          <div className={styles.avatar}>
            <Avatar size="large" src={currentUser.avatar} />
          </div>
          <div className={styles.content}>
            <div className={styles.contentTitle}>
              早安，
              {currentUser.name}
              ，祝你开心每一天！
            </div>
            <div>
              {currentUser.title} |{currentUser.group}
            </div>
          </div>
        </div>
      ) : null;

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>文章数</p>
          <p>56</p>
        </div>
        <div className={styles.statItem}>
          <p>注册用户</p>
          <p>2</p>
        </div>
        <div className={styles.statItem}>
          <p>网站访问</p>
          <p>2,223</p>
        </div>
      </div>
    );

    return (
      <PageHeaderWrapper
        loading={currentUserLoading}
        content={pageHeaderContent}
        extraContent={extraContent}
      >
        <div
          style={{
            position: 'relative',
            maxHeight: '400px',
            maxWidth: '1000px',
            boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
            overflow: 'hidden',
            borderRadius: '10px',
            margin: '0 auto',
          }}
        >
          <img
            style={{
              height: '400px',
              width: '1000px',
              objectFit: 'cover',
            }}
            src={this.image}
            alt="随机图片"
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Welecome;
