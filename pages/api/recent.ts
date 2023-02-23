// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";
import * as cheerio from "cheerio";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const recentNoticeIndex = await axios.get("http://web.kbuwel.or.kr/bbs/login.php").then(res=>{
    const {data} = res;
    const $ = cheerio.load(data);
    return $("a[href^=\"?wr\"]:first-child").attr("href") ?? ""
  });
  res.status(200).json({recent:recentNoticeIndex.replace("?wr_id=","")})
}
