
import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
//root module collates all sub modules, think of this as similar to the index.ts pattern when registering routes in an express app.
//its important to note that all modules are singletons by default, so the same instance is shared accross many consumers. 
@Module({
  imports: [CatsModule],
})
export class AppModule { }
