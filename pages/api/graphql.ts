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
                res.status(200).json(response)
            })
            .catch(err => {
                res.status(200).json(err)
            })
    } else {
        res.status(400).json({ message: 'need to use post' })
    }
}
