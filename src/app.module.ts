import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { SettingModule } from './setting/setting.module';
import { TaxModule } from './tax/tax.module';
import { CompanyModule } from './company/company.module';
import { NotificationModule } from './notification/notification.module';
import { CategoryModule } from './category/category.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { CurrencyModule } from './currency/currency.module';
import { DocumentModule } from './document/document.module';
import { TransactionModule } from './transaction/transaction.module';
import { ContactModule } from './contact/contact.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { AccountModule } from './account/account.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DocumentInvoiceModule } from './document-invoice/document-invoice.module';
import { DocumentBillModule } from './document-bill/document-bill.module';
import { ArticleModule } from './article/article.module';
import { DocumentArticleModule } from './document-article/document-article.module';
import { DocumentArticleTaxModule } from './document-article-tax/document-article-tax.module';
import { InvitationModule } from './invitation/invitation.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    SettingModule,
    TaxModule,
    CompanyModule,
    NotificationModule,
    CategoryModule,
    RoleModule,
    PermissionModule,
    CurrencyModule,
    DocumentModule,
    DocumentArticleModule,
    DocumentArticleTaxModule,
    DocumentInvoiceModule,
    DocumentBillModule,
    TransactionModule,
    ContactModule,
    AuthenticationModule,
    AuthorizationModule,
    AccountModule,
    ArticleModule,
    InvitationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
