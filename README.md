# BFHL API

## ✨ Features
- `POST /bfhl` — accepts `{ "data": [...] }`
- Buckets: `even_numbers`, `odd_numbers`, `alphabets` (uppercased), `special_characters`
- `sum`: sum of all integer-like tokens (as a **string**)
- `concat_string`: all alphabetical characters from the whole payload, **reversed**, with **alternating caps** starting with UPPER at index 0
- `user_id`: `<full_name>_<dobDDMMYYYY>` built from env vars
- Robust validation and centralized error handling

## Run Locally

```bash
# install
npm install
# start local server
npm run dev
```

## Testing

```powershell
curl.exe --% -X POST https://bajaj-bfhl-api-five.vercel.app/bfhl -H "Content-Type: application/json" -d "{\"data\":[\"1\",\"2\",\"a\",\"B\",\"$\",\"12c\",\"-3\"]}"
```

Sample response:

```json
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["1","-3"],
  "even_numbers": ["2"],
  "alphabets": ["A","B"],
  "special_characters": ["$","12c"],
  "sum": "0",
  "concat_string": "CbA"
}
```