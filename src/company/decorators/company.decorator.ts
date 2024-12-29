import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CompanyEntity } from '../entities/company.entity';

export const Company = createParamDecorator(
  (field: keyof CompanyEntity, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const company = request.company;

    return field ? company?.[field] : company;
  },
);
