import { ObjectId } from "mongodb";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { connectToDatabase } from "@/utils/db";
import { verify } from "@/utils/jwt";

import { getMyOauth } from "./server";

const GET = async (
  req: Request,
) => {
  // 헤더 설정
  const new_headers = new Headers();
  new_headers.append("Content-Type", "application/json; charset=utf-8");
  
  // Authorization 헤더 확인
  const authorization = headers().get("authorization");
  const verified = await verify(authorization?.split(" ")[1] || "");
  if(!verified.ok || !verified.payload?.id) return new NextResponse(JSON.stringify({
    message: "로그인이 필요합니다.",
  }), {
    status: 401,
    headers: new_headers
  });

  const data = await getMyOauth(verified.payload.id);
  
  if(!data) {
    return new NextResponse(JSON.stringify({
      message: "등록된 Oauth가 없습니다.",
    }), {
      status: 400,
      headers: new_headers,
    });
  }
  else {
    return new NextResponse(JSON.stringify({
      data,
    }), {
      status: 200,
      headers: new_headers,
    });
  }
};

export default GET;