import React from 'react';
import { Input, Modal, Select, notification, Comment, Avatar, Tag } from 'antd';
import { connect } from 'dva';

@connect(({ article }) => ({
  article,
}))
class CommentsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      keywordCom: '',
      pageNum: 1,
      pageSize: 50,
    };
    this.handleChangeState = this.handleChangeState.bind(this);
  }

  componentDidMount() {}

  handleChangeState = (value, type, index, item) => {
    // console.log('value', value)
    // console.log('type', type)
    // console.log('index', index)
    // console.log('item', item)
    this.setState({
      loading: true,
    });
    const { dispatch } = this.props;
    if (type === 1) {
      const params = {
        id: item._id,
        state: parseInt(value),
      };
      new Promise(resolve => {
        dispatch({
          type: 'article/changeComment',
          payload: {
            resolve,
            params,
          },
        });
      }).then(res => {
        // console.log('res :', res);
        if (res.code === 0) {
          this.setState({
            loading: false,
          });
          this.props.getArticleDetail();
          notification.success({
            message: res.message,
          });
        } else {
          notification.error({
            message: res.message,
          });
        }
      });
    } else {
      const params = {
        id: item._id,
        state: parseInt(value),
        index: index,
      };
      new Promise(resolve => {
        dispatch({
          type: 'article/changeThirdComment',
          payload: {
            resolve,
            params,
          },
        });
      }).then(res => {
        // console.log('res :', res);
        if (res.code === 0) {
          this.setState({
            loading: false,
          });
          this.props.getArticleDetail();
          notification.success({
            message: res.message,
          });
        } else {
          notification.error({
            message: res.message,
          });
        }
      });
    }
  };

  render() {
    const { articleDetail } = this.props.article;

    const ExampleComment = ({ item, children }) => (
      <Comment
        actions={item.actions}
        author={<a>{item.user.name}</a>}
        avatar={<Avatar src={item.user.avatar} alt={item.user.name} />}
        content={
          <p>
            {' '}
            {item.to_user ? '@' + item.to_user.name + ':  ' : ''} {item.content}
          </p>
        }
      >
        {children}
      </Comment>
    );

    let list = [];
    let length = articleDetail.comments.length;
    for (let i = 0; i < length; i++) {
      const e = articleDetail.comments[i];
      let defaultValue = '';
      if (e.state === 0) {
        defaultValue = '?????????';
      } else if (e.state === 1) {
        defaultValue = '????????????';
      } else if (e.state === -1) {
        defaultValue = '??????';
      } else if (e.state === -2) {
        defaultValue = '????????????';
      }
      const actions = [
        <div>
          {e.is_handle === 2 ? (
            <Tag color="red">????????????</Tag>
          ) : (
            <Tag color="green">???????????????</Tag>
          )}
          <Select
            style={{ width: 200, marginBottom: 10, marginLeft: 10 }}
            placeholder="??????????????????"
            defaultValue={defaultValue}
            onChange={value => {
              this.handleChangeState(value, 1, i, e);
            }}
          >
            {/* ?????? => 0 ????????? / 1 ???????????? / -1 ????????? / -2 ???????????? */}
            <Select.Option value="0">?????????</Select.Option>
            <Select.Option value="1">????????????</Select.Option>
            <Select.Option value="-1">??????</Select.Option>
            <Select.Option value="-2">????????????</Select.Option>
          </Select>
        </div>,
      ];
      e.actions = actions;
      let len = e.other_comments.length;
      if (len) {
        let arr = [];
        for (let i = 0; i < len; i++) {
          let item = e.other_comments[i];
          let defaultValue = '';
          if (item.state === 0) {
            defaultValue = '?????????';
          } else if (item.state === 1) {
            defaultValue = '????????????';
          } else if (item.state === -1) {
            defaultValue = '??????';
          } else if (item.state === -2) {
            defaultValue = '????????????';
          }
          const actions2 = [
            <Select
              style={{ width: 200, marginBottom: 10 }}
              placeholder="??????????????????"
              defaultValue={defaultValue}
              onChange={value => {
                this.handleChangeState(value, 2, i, e);
              }}
            >
              {/* ?????? => 0 ????????? / 1 ???????????? / -1 ????????? / -2 ???????????? */}
              <Select.Option value="0">?????????</Select.Option>
              <Select.Option value="1">??????</Select.Option>
              <Select.Option value="-1">??????</Select.Option>
              <Select.Option value="-2">????????????</Select.Option>
            </Select>,
          ];
          item.actions = actions2;
          arr.push(<ExampleComment key={item._id} item={item} />);
        }
        list.push(
          <ExampleComment key={e._id} item={e}>
            {arr}
          </ExampleComment>
        );
      } else {
        list.push(<ExampleComment key={e._id} item={e} />);
      }
    }

    const normalCenter = {
      textAlign: 'center',
      marginBottom: 20,
    };
    return (
      <div>
        <Modal
          title="??????????????????"
          visible={this.props.commentsVisible}
          onOk={this.props.handleCommentsCancel}
          width="1200px"
          onCancel={this.props.handleCommentsCancel}
        >
          <h2 style={normalCenter}>{articleDetail.title}</h2>
          {/*  <p>{articleDetail.desc}</p> */}

          <div>{list.length ? list : <div style={normalCenter}>???????????????</div>}</div>
        </Modal>
      </div>
    );
  }
}

export default CommentsComponent;
