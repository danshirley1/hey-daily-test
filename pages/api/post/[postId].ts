import type { NextApiRequest, NextApiResponse } from 'next';
import { Post } from '../../../interfaces';
import { runQuery } from 'server/db-query';

function ensureValidParam(param: string | string[] | undefined): string {
  if (!param || Array.isArray(param)) {
    throw new Error(`Invalid parameter: ${param}`);
  }
  return param;
}

async function getPost(postId: string): Post {
  const query = `
    SELECT * FROM posts WHERE id = ${postId};
  `;

  const queryResult = await runQuery(query);

  if (queryResult && queryResult[0] && queryResult.length) {
    const {
      id,
      title,
      body,
      created,
      creatorId,
    } = queryResult[0][0];

    return {
      id,
      title,
      body,
      attachments: [
        {
          type: 'image',
          src: '/postImage1.jpg',
        },
      ],
      comments: [],
      createdAt: new Date(Date.parse(created)),
      creator: {
        id: creatorId,
        name: 'Joe Blogs',
        profileImagePath: 'https://thispersondoesnotexist.com/image',
      },
    };
  }

  throw new Error('Unexpected query response payload!');
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post>
) {
  const postId = ensureValidParam(req.query.postId);
  const method = req.method;

  switch (method) {
    case 'GET':
      res.status(200).json(await getPost(postId));
      break;
      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
  }
}
