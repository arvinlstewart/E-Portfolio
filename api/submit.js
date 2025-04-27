
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  const { fullName, email, jobtitle, issues, platforms, qa, opt } = req.body;

  // Airtable settings — hardcoded based on what you shared
  const AIRTABLE_BASE_ID = 'appioblrblEFkppAF';
  const AIRTABLE_TABLE_NAME = 'Ad_Ops_Lead';
  const AIRTABLE_API_KEY = 'patk7uHom7IqgUgXE.9cb7e4f6da1770c587168fb2953ce76c6e6ab880aa6857a7fbc7d1be410a6b6d';

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
