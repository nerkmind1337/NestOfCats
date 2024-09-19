
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
    controllers: [CatsController],
    providers: [CatsService],
})
export class CatsModule {
    constructor(private catsService: CatsService) { } // you can do DI here too, if you wanted to configure a service a little differently for a specific module. 
}