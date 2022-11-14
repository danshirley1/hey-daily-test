import { runQuery } from 'server/db-query';
import { CreatePostFormFields } from "../../../interfaces";

function validateFormFields(data: CreatePostFormFields): boolean {
  const {
    creatorId,
    title,
    content,
  } = data;

  return (!!creatorId && !!title && !!content); // TODO implement thorough validation rules e.g. max-len
}

async function savePost(data: CreatePostFormFields): number  {
  const {
    creatorId,
    title,
    content,
  } = data;

  const query = `
    INSERT INTO posts (creatorId, title, body)
    VALUES (${creatorId}, '${title}', '${content}');
  `;

  const queryResult = await runQuery(query);

  if (queryResult && queryResult[0] && Object.prototype.hasOwnProperty.call(queryResult[0], 'insertId')) {
    return queryResult[0].insertId;
  }

  throw new Error('Unexpected query response!');
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post>
) {
  const method = req.method;

  switch (method) {
    case 'POST':
      const isFormValid: boolean = validateFormFields(req.body);

      if (!isFormValid) return res.status(400).end('One or more form fields were invalid!');

      try {
        const newPostId: number = await savePost(req.body);
        return res.redirect(307, `/${newPostId}`);
      } catch (err) {
        console.log('Form submission failure!', err);
        return res.status(500).end('Form submission failed!');
      }
      break;
      default:
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
  }
}
