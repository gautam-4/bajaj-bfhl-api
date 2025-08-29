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