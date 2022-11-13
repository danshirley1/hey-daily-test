// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Post } from "../../../interfaces";

function ensureValidParam(param: string | string[] | undefined): string {
    if (!param || Array.isArray(param)) {
        throw new Error(`Invalid parameter: ${param}`);
    }
    return param;
}

function getPost(postId: string): Post {
    // TODO: Fill this logic in with persistent storage
    // Return a hard-coded placeholder post
    return {
        id: postId,
        title: "Not all who wander are lost",
        body:
            "All that is gold does not glitter,\n" +
            "Not all those who wander are lost;\n" +
            "The old that is strong does not wither,\n" +
            "Deep roots are not touched by the frost.\n" +
            "\n" +
            "From the embers a fire shall be woken,\n" +
            "A light from the darkness shall spring;\n" +
            "Renewed shall be blade that is broken,\n" +
            "The crownless again shall be king.",
        attachments: [
            {
                type: "image",
                src: "/postImage1.jpg",
            },
        ],
        comments: [],
        creator: {
            name: "Joe Blogs",
            profileImagePath: "https://thispersondoesnotexist.com/image",
        },
        createdAt: new Date(Date.parse("05 Nov 2022 12:42:00 GMT")),
    };
}

function savePost(postBody: Post): Post {
    // TODO: Fill this logic in to save a post to persistent storage
    return getPost(postBody.id);
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Post>
) {
    const postId = ensureValidParam(req.query.postId);
    const method = req.method;

    switch (method) {
        case "GET":
            res.status(200).json(getPost(postId));
            break;
        case "PUT":
            // Update or create data in database
            res.status(200).json(savePost(req.body));
            break;
        default:
            res.setHeader("Allow", ["GET", "PUT"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
