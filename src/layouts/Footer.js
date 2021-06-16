/*
 * @Author       : helishou
 * @Date         : 2021-05-26 20:17:55
 * @LastEditTime : 2021-06-16 21:27:28
 * @LastEditors  : helishou
 * @Description  : 页脚
 * @FilePath     : \src\layouts\Footer.js
 * 你用你的指尖,阻止我说再见,在bug完全失去之前
 */
import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'github',
          title: <Icon type="github" title='github源码' />,
          href: 'https://github.com/helishou',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: 'Ant Design',
          href: 'https://ant.design',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> @helishou
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
