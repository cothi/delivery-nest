import { Module } from '@nestjs/common';
import { DatabaseModule } from '../infrastructure/prisma/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [],
})
export class RestaurantModule {}
