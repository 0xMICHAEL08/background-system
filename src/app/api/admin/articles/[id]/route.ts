import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest, { params }: any) => {
  const data = await req.json(); // 请求体中传递的数据
  const { id } = params; // 路由中传递的参数

  await prisma.article.update({
    where: { id }, // 更新具有指定 id 的内容
    data,
  });

  return NextResponse.json({
    // 返回一个 JSON 响应，表示操作成功
    success: "true",
    errorMessage: "更新成功",
  });
};

export const DELETE = async (req: NextRequest, { params }: any) => {
  const { id } = params;
  await prisma.article.delete({
    where: { id },
  });

  return NextResponse.json({
    success: "true",
    errorMessage: "删除成功",
  });
};
