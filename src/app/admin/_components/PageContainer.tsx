"use client";
import { Card } from "antd";

const PageContainer = ({ children, title, extra }: any) => {
  return (
    <Card title={title} extra={extra}>
      {children}
    </Card>
  );
};

export default PageContainer;
