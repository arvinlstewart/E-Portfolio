export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST method allowed' });
  }

  const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
  const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;

  const { fullName, email, jobtitle, issues, platforms, qa, opt } = req.body;

  if (!fullName || !email || !jobtitle) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

  try {
    const airtableResponse = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              fullName: fullName,
              email: email,
              jobtitle: jobtitle,
              issues: issues || "",
              platforms: platforms ? JSON.parse(platforms) : [],
              qa: qa || "",
              opt: opt || ""
              // timestamp field is automatically handled by Airtable
            }
          }
        ]
      })
    });

    const result = await airtableResponse.json();

    if (airtableResponse.ok) {
      return res.status(200).json({ message: "Success", data: result });
    } else {
      console.error("Airtable error:", result);
      return res.status(airtableResponse.status).json({ message: result.error.message, error: result.error });
    }

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
