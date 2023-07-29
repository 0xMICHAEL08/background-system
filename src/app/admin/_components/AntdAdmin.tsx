"use client";
/* 管理后台的页面布局 */
import React, { useState } from "react";
import { Layout, Menu, Button, theme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Header, Sider, Content } = Layout;

const AntdAdmin = ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const nav = useRouter();

  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            onClick={({ key }) => {
              nav.push(key);
            }}
            items={[
              {
                key: "/admin/dashboard",
                icon: <DashboardOutlined />,
                label: "看板",
              },
              {
                key: "/admin/users",
                icon: <UserOutlined />,
                label: "用户信息",
              },
              {
                key: "/admin/articles",
                icon: <UploadOutlined />,
                label: "文章管理",
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AntdAdmin;
