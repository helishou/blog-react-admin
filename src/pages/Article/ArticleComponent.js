import React from 'react';
import { Input, Modal, Select, notification, Button } from 'antd';
import { connect } from 'dva';
import openWindow from '../../utils/openWindow';

@connect(({ article, tag, category }) => ({
  article,
  tag,
  category,
}))
class ArticleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      keywordCom: '',
      pageNum: 1,
      pageSize: 50,
    };
    this.handleSearchTag = this.handleSearchTag.bind(this);
    this.handleSearchCategory = this.handleSearchCategory.bind(this);
  }

  componentDidMount() {
    this.handleSearchTag();
    this.handleSearchCategory();
  }

  handleSearchTag = () => {
    this.setState({
      loading: true,
    });
    const { dispatch } = this.props;
    const params = {
      keyword: this.state.keywordCom,
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize,
    };
    new Promise(resolve => {
      dispatch({
        type: 'tag/queryTag',
        payload: {
          resolve,
          params,
        },
      });
    }).then(res => {
      if (res.code === 0) {
        this.setState({
          loading: false,
        });
      } else {
        notification.error({
          message: res.message,
        });
      }
    });
  };

  handleSearchCategory = () => {
    this.setState({
      loading: true,
    });
    const { dispatch } = this.props;
    const params = {
      keyword: this.state.keyword,
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize,
    };
    new Promise(resolve => {
      dispatch({
        type: 'category/queryCategory',
        payload: {
          resolve,
          params,
        },
      });
    }).then(res => {
      if (res.code === 0) {
        this.setState({
          loading: false,
        });
      } else {
        notification.error({
          message: res.message,
        });
      }
    });
  };

  // 选择图片
  selectImage = () => {
    openWindow('http://www.netbian.com/erciyuan/index_8.htm', '右键复制图片地址', 1080, 640);
  };

  render() {
    const { tagList } = this.props.tag;
    const { categoryList } = this.props.category;
    const children = [];
    const categoryChildren = [];
    for (let i = 0; i < tagList.length; i++) {
      const e = tagList[i];
      children.push(
        <Select.Option key={e._id} value={e._id}>
          {e.name}
        </Select.Option>
      );
    }
    for (let i = 0; i < categoryList.length; i++) {
      const e = categoryList[i];
      categoryChildren.push(
        <Select.Option key={e._id} value={e._id}>
          {e.name}
        </Select.Option>
      );
    }
    const { changeType } = this.props;
    const { TextArea } = Input;
    const normalCenter = {
      textAlign: 'center',
      marginBottom: 20,
    };
    return (
      <div>
        <Modal
          title="添加与修改文章"
          visible={this.props.visible}
          onOk={this.props.handleOk}
          width="1200px"
          onCancel={this.props.handleCancel}
        >
          <Input
            style={normalCenter}
            addonBefore="标题"
            size="large"
            placeholder="标题"
            name="title"
            value={this.props.title}
            onChange={this.props.handleChange}
          />
          <Input
            style={normalCenter}
            addonBefore="作者"
            size="large"
            placeholder="作者"
            name="author"
            value={this.props.author}
            onChange={this.props.handleChangeAuthor}
          />
          <Input
            style={normalCenter}
            addonBefore="关键字"
            size="large"
            placeholder="关键字"
            name="keyword"
            value={this.props.keyword}
            onChange={this.props.handleChangeKeyword}
          />
          <Input
            style={normalCenter}
            addonBefore="描述"
            size="large"
            placeholder="描述"
            name="desc"
            value={this.props.desc}
            onChange={this.props.handleChangeDesc}
          />
          <div>
            <Input
              style={(normalCenter, { width: '70%' })}
              addonBefore="封面链接"
              size="large"
              placeholder="封面链接"
              name="img_url"
              value={this.props.img_url}
              onChange={this.props.handleChangeImgUrl}
            />
            <Button
              onClick={this.selectImage}
              size="large"
              style={{ marginLeft: '10px', fontSize: '14px' }}
            >
              选择图片
            </Button>
          </div>
          <Select
            style={{ width: 200, marginTop: 20, marginBottom: 20 }}
            placeholder="选择发布状态"
            value={String(this.props.state)}
            onChange={this.props.handleChangeState}
          >
            {/*  0 草稿，1 发布 */}
            <Select.Option value="0">草稿</Select.Option>
            <Select.Option value="1">发布</Select.Option>
          </Select>

          <Select
            style={{ width: 200, marginTop: 20, marginBottom: 20 }}
            placeholder="选择文章类型"
            value={String(this.props.type)}
            onChange={this.props.handleChangeType}
          >
            <Select.Option value="1">普通文章</Select.Option>
            <Select.Option value="2">项目</Select.Option>
          </Select>

          <Select
            style={{ width: 200, marginTop: 20, marginLeft: 10, marginBottom: 20 }}
            placeholder="选择文章转载状态"
            value={String(this.props.origin)}
            onChange={this.props.handleChangeOrigin}
          >
            {/* 0 原创，1 转载，2 混合 */}
            <Select.Option value="0">原创</Select.Option>
            <Select.Option value="1">转载</Select.Option>
            <Select.Option value="2">混合</Select.Option>
          </Select>

          <Select
            allowClear
            mode="multiple"
            style={{ width: 200, marginTop: 20, marginLeft: 10, marginBottom: 20 }}
            placeholder="标签"
            value={this.props.tagsDefault}
            onChange={this.props.handleTagChange}
          >
            {children}
          </Select>
          <Select
            allowClear
            mode="multiple"
            style={{ width: 200, marginTop: 20, marginLeft: 10, marginBottom: 20 }}
            placeholder="文章分类"
            value={this.props.categoryDefault}
            onChange={this.props.handleCategoryChange}
          >
            {categoryChildren}
          </Select>
          <Button
            type="primary"
            style={{
              // display:'block',
              marginLeft:'10px'
              // position: 'fixed',
              // left: '50%',
              // top: '10%',
              // zIndex: '999',
            }}
            onClick={this.props.handleOk}
          >
            提交
          </Button>
          <TextArea
            style={{ marginBottom: 20 }}
            size="large"
            rows={6}
            autoSize={{ minRows: 15 }}
            placeholder="文章内容，支持 markdown 格式"
            name="content"
            value={this.props.content}
            onChange={this.props.handleChangeContent}
          />
        </Modal>
      </div>
    );
  }
}

export default ArticleComponent;
