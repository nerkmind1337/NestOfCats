
import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
//root module collates all sub modules, think of this as similar to the index.ts pattern when registering routes in an express app.
@Module({
  imports: [CatsModule],
})
export class AppModule { }
