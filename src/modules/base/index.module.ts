import { Module, SetMetadata } from '@nestjs/common';
import { MODULE_PATH } from '@nestjs/common/constants';
import { collect } from '/@/util/file';
import { DatabaseModule } from '/@/common/database.module';
const modules = collect(__filename);
@SetMetadata(MODULE_PATH, 'base')
@Module({
  imports: [DatabaseModule],
  controllers: [...modules.controllers],
  providers: [...modules.services],
  exports: [],
})
export class AuthModule {}
