import {
	Injectable,
	CanActivate,
	ExecutionContext,
	UnauthorizedException,
    Global,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Global()
@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService) {}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest();
		const authHeader = request.headers.authorization;

		if (!authHeader) throw new UnauthorizedException();

		const [, token] = authHeader.split(' ');
		try {
			const payload = this.jwtService.verify(token);
			request.user = { id: payload.sub, email: payload.email }; // <-- кладем user
			return true;
		} catch {
			throw new UnauthorizedException();
		}
	}
}
