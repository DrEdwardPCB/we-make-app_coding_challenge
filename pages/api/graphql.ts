// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getPosts } from '../../utils/api'

type Data = {
    name?: string
    message?: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | any>
) {
    if (req.method === "POST") {

        getPosts(req.body.query)
            .then((response: any) => {
                return res.status(200).json(response.data.data)
            })
            .catch(err => {
                return res.status(400).json(err)
            })

    } else {
        return res.status(400).json({ message: 'need to use post' })
    }
}
