"use client";
import React, { useState, useEffect } from "react";
import { Form, Button, Table, Input, Card, Modal, Space } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const UsersPage = () => {
  const [open, setOpen] = useState(false); // 控制modal显示隐藏
  const [myForm] = Form.useForm(); // 获取Form组件实例
  const [list, setList] = useState([]);
  const [query, setQuery] = useState({});

  // 监听查询条件的改变
  useEffect(() => {
    fetch("/api/admin/articles")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setList(res.data.list);
      });
  }, [query]);

  return (
    <Card
      title="文章管理"
      extra={
        <>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              setOpen(true);
            }}
          />
        </>
      }
    >
      <Form layout="inline">
        <Form.Item label="名称">
          <Input placeholder="请输入关键词" />
        </Form.Item>
        <Form.Item>
          <Button icon={<SearchOutlined />} type="primary" />
        </Form.Item>
      </Form>
      <Table
        style={{ marginTop: "8px" }}
        dataSource={list}
        rowKey="id"
        columns={[
          {
            title: "序号",
            render(v, r, i) {
              // 当前行的值（v）、当前行数据（r）和行索引（i）
              return i + 1;
            },
          },
          {
            title: "标题",
            dataIndex: "title",
          },
          {
            title: "描述",
            dataIndex: "desc",
          },
          {
            title: "操作",
            render() {
              return (
                <Space>
                  <Button size="small" icon={<EditOutlined />} type="primary" />
                  <Button
                    size="small"
                    icon={<DeleteOutlined />}
                    type="primary"
                    danger
                  />
                </Space>
              );
            },
          },
        ]}
      />

      {/* 模态对话框 */}
      <Modal
        title="编辑"
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        onOk={() => {
          myForm.submit();
        }}
      >
        <Form
          layout="vertical"
          form={myForm}
          onFinish={async (v) => {
            await fetch("/api/admin/articles", {
              method: "POST",
              body: JSON.stringify(v),
            }).then((res) => res.json());
            setOpen(false);
            setQuery({}); // 改变query会重新取数据
          }}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[
              {
                required: true,
                message: "标题不能为空",
              },
            ]}
          >
            <Input placeholder="请输入标题" />
          </Form.Item>
          <Form.Item label="简介" name="desc">
            <Input.TextArea placeholder="请输入简介" />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default UsersPage;
