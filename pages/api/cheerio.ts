// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import * as cheerio from 'cheerio';

type Data = {
    name?: string
    message?: string
}
export interface IPost {
    name: string
    description: string
    votesCount: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | any>
) {
    if (req.method === "GET") {

        axios.get('https://www.producthunt.com/').then(response => {
            const $ = cheerio.load(response.data)
            const postlist = $('[class^="style_px-mobile-1"]')
            let jsonPost: Array<IPost> = []
            postlist.each((i, e) => {
                jsonPost.push({
                    name: $(e).contents().find('[class^="styles_title"]').text(),
                    description: $(e).contents().find('[class^="styles_tagline"]').text(),
                    votesCount: $(e).contents().find('[class^="styles_reset"]').contents().find('[class^="style_color-light-grey"]').text(),
                })
            })
            return res.json(jsonPost)
        })

    } else {
        return res.status(400).json({ message: 'need to use GET' })
    }
}

