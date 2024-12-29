import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { CompanyService } from '../company.service';

@Injectable()
export class EnabledCompanyGuard implements CanActivate {
  constructor(private readonly companyService: CompanyService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const company = await this.companyService.findEnabledByUser(user.id);

    if (!company) {
      throw new BadRequestException('No company enabled');
    }

    request['company'] = company;

    return true;
  }
}
