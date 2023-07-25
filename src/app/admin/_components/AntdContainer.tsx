"use client";
/* antd组件库容器 */

import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";

const AntdContainer = ({ children }: any) => {
  return <ConfigProvider locale={zhCN}>{children}</ConfigProvider>;
};

export default AntdContainer;
