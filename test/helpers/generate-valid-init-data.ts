import { createHmac } from 'crypto';
import type { InitDataUser } from '../../src/modules/auth/interfaces/init-data.interface';

interface InitDataOverrides {
  authDate: number;
  queryId: string;
  startParam: string;
}

/**
 * Generates a valid Telegram initData query string for tests.
 */
export function generateValidInitData(
  botToken: string,
  userData: InitDataUser,
  overrides: Partial<InitDataOverrides> = {},
): string {
  const authDate = overrides.authDate ?? Math.floor(Date.now() / 1000);
  const queryId = overrides.queryId ?? 'test-query-id';

  const params = new URLSearchParams();
  params.set('auth_date', String(authDate));
  params.set('query_id', queryId);
  params.set('user', JSON.stringify(userData));

  if (overrides.startParam) {
    params.set('start_param', overrides.startParam);
  }

  const dataCheckString = buildDataCheckString(params);
  const secretKey = createHmac('sha256', 'WebAppData')
    .update(botToken)
    .digest();
  const hash = createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');

  secretKey.fill(0);
  params.set('hash', hash);

  return params.toString();
}

/**
 * Generates valid initData and mutates one field to force hash mismatch.
 */
export function generateTamperedInitData(
  botToken: string,
  userData: InitDataUser,
): string {
  const initData = generateValidInitData(botToken, userData);
  const params = new URLSearchParams(initData);
  const queryId = params.get('query_id') ?? 'test-query-id';
  params.set('query_id', `${queryId}-tampered`);
  return params.toString();
}

function buildDataCheckString(params: URLSearchParams): string {
  return [...params.entries()]
    .filter(([key]) => key !== 'hash')
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');
}
