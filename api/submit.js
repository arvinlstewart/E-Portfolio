export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', 'https://arvinstewart.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST method allowed' });
  }

  const { fullName, email, jobtitle, issues, platforms, qa, opt } = req.body;

  const AIRTABLE_BASE_ID = 'appioblrblEFkppAF';
  const AIRTABLE_TABLE_NAME = 'Ad_Ops_Lead';
  const AIRTABLE_API_KEY = 'patk7uHom7IqgUgXE';

  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        fullName,
        email,
        jobtitle,
        issues,
        platforms,
        qa,
        opt,
      },
    }),
  };

  try {
    const airtableRes = await fetch(url, options);
    const data = await airtableRes.json();

    if (!airtableRes.ok) {
      throw new Error(data.error?.message || 'Failed to save data to Airtable');
    }

    res.status(200).json({ message: 'Success', data });
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.toString() });
  }
}
