import { Module } from '@nestjs/common';
import { collect } from '/@/util/file';
const modules = collect(__filename);
@Module({
  imports: [],
  controllers: modules.controllers,
  providers: modules.services,
})
export class SpecialModule {

}