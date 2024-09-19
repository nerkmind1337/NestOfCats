
import { Body, Controller, Get, Header, HttpCode, Param, Post, Redirect, Req, Res } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';


//controller decorator with argument "cats", will accept incoming requests for https://whatever.meow/cats
@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) { } //dependancy injection

    @Get()
    @Header('Cache-Control', 'none') //edit response headers
    async findAll(@Req() request: Request, @Res() reqponse: Response): Promise<Cat[]> {
        return this.catsService.findAll();
    };
    //adding /breed into the get decorator, will map this route handler to https://whatever.meow/cats/breed
    @Get('/breed/:breedId')
    findAllByBreed(@Param('breedId') breedId: string): string {
        return `This action returns all cats in the breed id #${breedId} cat`;
    }

    @Get('/:catId')
    findOne(@Param('catId') catId: string): string {
        return `This action returns a specific cat #${catId}`;
    }

    //redirect route - might be nice for backwards compat? redirecting users still using v1 api to v2, where applicable
    @Get('/this-cat-has-moved-home')
    @Redirect('https://icanhas.cheezburger.com/lolcats', 301)

    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
    }

}
