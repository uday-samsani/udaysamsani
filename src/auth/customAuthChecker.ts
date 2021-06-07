import {AuthChecker} from 'type-graphql';
import jwt from 'jsonwebtoken';
// import {JwtToken} from '../types';

export const customAuthChecker: AuthChecker = async (
	{context: {jwtToken}}: any,
	roles: string[],
) => {
	console.log(roles);
	console.log(jwtToken);
	try {
		const isValid = await jwt.verify(jwtToken, process.env.SECRET_KEY || '');
		console.log(isValid);
		return !!isValid;
	} catch (err) {
		return false;
	}
};