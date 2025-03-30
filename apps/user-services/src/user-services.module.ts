import { Module } from '@nestjs/common';
import { UserServicesController } from './user-services.controller';
import { UserServicesService } from './user-services.service';

@Module({
  imports: [],
  controllers: [UserServicesController],
  providers: [UserServicesService],
})
export class UserServicesModule {}
