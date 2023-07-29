"use client";
import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Table,
  Input,
  Card,
  Modal,
  Space,
  Popconfirm,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

interface Article {
  id: string;
  title: string;
  desc: string;
}

const UsersPage = () => {
  const [open, setOpen] = useState(false); // 控制modal显示隐藏
  const [myForm] = Form.useForm(); // 获取Form组件实例
  const [list, setList] = useState<Article[]>([]);
  const [query, setQuery] = useState({});
  const [currentId, setCurrentId] = useState(""); // 区分当前modal为新增/修改，存在表示修改，不存在表示新增

  // 监听查询条件的改变
  useEffect(() => {
    fetch("/api/admin/articles")
      .then((res) => res.json())
      .then((res) => {
        setList(res.data.list);
      });
  }, [query]);

  // 清除当前选中的id
  useEffect(() => {
    if (!open) setCurrentId("");
  }, [open]);

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
              // 当前单元格的数据（v）、当前行的数据（r）和行索引（i）
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
            render(v, r) {
              return (
                <Space>
                  <Button
                    size="small"
                    icon={<EditOutlined />}
                    type="primary"
                    onClick={() => {
                      setOpen(true);
                      setCurrentId(r.id); // 将currentId设置为当前行id，表示将要修改
                      myForm.setFieldsValue(r); // 填充当前整行的数据
                    }}
                  />
                  <Popconfirm
                    title="是否确认删除？"
                    onConfirm={async () => {
                      await fetch("/api/admin/articles/" + r.id, {
                        method: "DELETE",
                      }).then((res) => res.json());
                      setQuery({});
                    }}
                  >
                    <Button
                      size="small"
                      icon={<DeleteOutlined />}
                      type="primary"
                      danger
                    />
                  </Popconfirm>
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
        destroyOnClose={true} // 关闭窗口后销毁
        maskClosable={false} // 点击空白处不关闭
      >
        <Form
          preserve={false} // 与destroyOnClose结合使用，否则不会销毁
          layout="vertical"
          form={myForm}
          onFinish={async (v) => {
            if (currentId) {
              // 修改
              await fetch("/api/admin/articles/" + currentId, {
                body: JSON.stringify(v),
                method: "PUT",
              }).then((res) => res.json());
            } else {
              // 新增
              await fetch("/api/admin/articles", {
                body: JSON.stringify(v),
                method: "POST",
              }).then((res) => res.json());
            }
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
