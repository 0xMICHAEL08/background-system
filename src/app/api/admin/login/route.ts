import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const POST = (request: NextRequest) => {
  const token = crypto.randomBytes(64).toString("hex");

  return NextResponse.json(
    {
      // 返回给客户端的 JSON 数据
      success: "true",
      errorMesage: "登录成功",
    },
    {
      // 设置 HTTP 响应头的信息
      headers: {
        "Set-Cookie": `admin-token=${token};Path=/`,
      },
    }
  );
};
