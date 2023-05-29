import { Module } from '@nestjs/common';
import { ModulesModule } from './modules';
import { CommonModule } from '/@/common/common.module';
import { EventsGatewayService } from '/@/common/events-gateway.service';
@Module({
  imports: [ CommonModule, ModulesModule],
  controllers: [],
  providers: [
    // EventsGatewayService
  ],
})
export class AppModule {}
