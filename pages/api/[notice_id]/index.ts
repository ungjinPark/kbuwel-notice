// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";
import * as cheerio from "cheerio";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {notice_id} = req.query;
    const idNum = typeof notice_id == "string" && notice_id.replace("notice_id=","");
    const content = await axios.get(`http://web.kbuwel.or.kr/bbs/login.php?wr_id=${idNum}`)
    .then(res=>{
        const {data} = res;
        const $ = cheerio.load(data);
        return {
            title:$(".title").text().split(": ")[1],
            date:$(".date").text().split(": ")[1].trim(),
            content:$(".content").html()
        }
    })
    res.status(200).json(content);
}
