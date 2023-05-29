import { Module, Global } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { EventsGatewayService } from './events-gateway.service';
@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [EventsGatewayService],
  exports: [DatabaseModule]
})
export class CommonModule {}
