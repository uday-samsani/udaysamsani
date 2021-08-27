import {AuthChecker} from 'type-graphql';
import jwt from 'jsonwebtoken';
export const customAuthChecker: AuthChecker = async (
	{context: {jwtToken, log}}:any,
	roles: string[],
) => {
	console.log(roles);
	try {
		const isValid = await jwt.verify(jwtToken, process.env.SECRET_KEY || '');
		return !!isValid;
	} catch (err) {
		log.error(err);
		return false;
	}
};