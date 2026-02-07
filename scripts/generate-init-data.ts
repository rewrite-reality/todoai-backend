import { createHmac } from 'crypto';

const BOT_TOKEN = process.env.BOT_TOKEN || '8544115698:AAE8SBtD3lwXEjjhazLRel18yXrke4b3B-8';

const user = {
	id: 123456789,
	first_name: 'Test',
	last_name: 'User',
	username: 'testuser',
	language_code: 'ru',
	photo_url: 'https://example.com/photo.jpg',
};

const authDate = Math.floor(Date.now() / 1000);

const params = new URLSearchParams();
params.set('auth_date', String(authDate));
params.set('query_id', 'test-query-id');
params.set('user', JSON.stringify(user));

// Build data_check_string
const dataCheckString = [...params.entries()]
	.sort(([a], [b]) => a.localeCompare(b))
	.map(([k, v]) => `${k}=${v}`)
	.join('\n');

// HMAC
const secretKey = createHmac('sha256', 'WebAppData')
	.update(BOT_TOKEN)
	.digest();
const hash = createHmac('sha256', secretKey)
	.update(dataCheckString)
	.digest('hex');

params.set('hash', hash);

console.log('\n=== initData (URL-encoded) ===\n');
console.log(params.toString());
console.log('\n=== Expires in 5 minutes ===\n');