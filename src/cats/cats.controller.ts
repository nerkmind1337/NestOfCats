
import { Body, Controller, Get, Header, HttpCode, Param, Post, Redirect, Req, Res, StreamableFile } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { createReadStream, readdir, readdirSync } from 'fs';
import path, { join } from 'path';


//controller decorator with argument "cats", will accept incoming requests for https://whatever.meow/cats
// a fun thing to note abo the @Res() decorator, if you include it Nestjs will not automatically send the response to the client, it will assume you want to handle it manually. so if you include it, you better handle it yourself!


@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) { } //dependancy injection

    @Get()
    @Header('Cache-Control', 'none') //edit response headers
    findAll(@Req() request: Request): Cat[] {
        return this.catsService.findAll();
    };
    //adding /breed into the get decorator, will map this route handler to https://whatever.meow/cats/breed
    @Get('/breed/:breedId')
    findAllByBreed(@Param('breedId') breedId: string): string {
        return `This action returns all cats in the breed id #${breedId} cat`;
    }

    @Get('/image')
    @Header('Content-Type', 'image/png')
    @Header('Content-Disposition', 'inline')
    @Header('Cache-Control', 'no-cache')
    getRandomCatImage() {
        const files = readdirSync(join(process.cwd(), '/src/assets'));

        if (files.length === 0) {
            throw new Error('No files found in the directory');
        }

        const randomFile = files[Math.floor(Math.random() * files.length)];

        const filePath = join(process.cwd(), `/src/assets/${randomFile}`);
        return new StreamableFile(createReadStream(filePath));
    }


    @Get('/cat/:catId')
    findOne(@Param('catId') catId: string): string {
        return `This action returns a specific cat #${catId}`;
    }

    //redirect route - might be nice for backwards compat? redirecting users still using v1 api to v2, where applicable
    @Get('/who-tore-up-my-damn-couch')
    @Redirect('https://icanhas.cheezburger.com/lolcats', 301)
    findCatByWhoToreUpMyDamnCouch(@Param('catId') catId: string): string {
        return `you'll never get here. because of the redirect. (and the implications)`;
    }

    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create({
            ...createCatDto,
            id: Math.random(),
        });
    }

}
