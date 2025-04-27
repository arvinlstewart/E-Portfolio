export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*'); // ⬅️ Use your exact domain
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST method allowed' });
  }

  const { fullName, email, jobtitle, issues, platforms, qa, opt } = req.body;

  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
  const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;
  const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;

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

    console.log("✅ Airtable Response:", data);

    if (!airtableRes.ok) {
      console.error("❌ Airtable Error Details:", data);
      throw new Error(data.error?.message || 'Failed to save data to Airtable');
    }

    res.status(200).json({ message: 'Success', data });
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ message: 'Error', error: error.toString() });
  }
}
