
const { REACT_APP_API_DOMAIN = 'https://localhost:7140' } = process.env;

export default class ApiEndpoints {
	public static readonly CANDIDATES_ENDPOINT = `${REACT_APP_API_DOMAIN}/candidates`;
	public static readonly VOTES_ENDPOINT = `${REACT_APP_API_DOMAIN}/votes`;
}