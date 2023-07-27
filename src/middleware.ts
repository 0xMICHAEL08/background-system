/* 每段代码执行时都会经过中间件 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // 访问管理后台：登录态校验
    if (!request.nextUrl.pathname.startsWith("/admin/login")) {
      // 不是登录页面：判断是否登录过
      if (request.cookies.get("admin-token")) {
        // 已经登录：什么都不做
      } else {
        // 跳转到登录页
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    }
  }
}
