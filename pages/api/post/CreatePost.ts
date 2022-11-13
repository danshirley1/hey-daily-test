import { runQuery } from 'server/db-query';

function validateFormFields(data) {
  const { creatorId, title, content } = data;
  return (!!creatorId && !!title && !!content); // TODO implement thorough validation rules
}

function savePost(data) {
  const { creatorId, title, content } = data;
  const query = `
    INSERT INTO posts (creatorId, title, body)
    VALUES (${creatorId}, '${title}', '${content}');
  `;

  runQuery(query);
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post>
) {
  const method = req.method;

  switch (method) {
    case 'POST':
      const isFormValid = validateFormFields(req.body);

      if (!isFormValid) return res.status(400).end('One or more form fields were invalid!');

      try {
        res.status(200).json(savePost(req.body));
      } catch (err) {
        res.status(500).end('Form submission failed!');
      }
      break;
      default:
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
  }
}
