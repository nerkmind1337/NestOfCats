
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
    private readonly cats: Cat[] = [{
        name: 'Whiskers',
        age: 2,
        breed: 'Siamese',
        image: 'https://placecats.com/500/500',
        id: 1
    },
    {
        name: 'Shadow',
        age: 4,
        breed: 'Maine Coon',
        image: 'https://placecats.com/500/500',
        id: 2
    },
    {
        name: 'Mittens',
        age: 1,
        breed: 'British Shorthair',
        image: 'https://placecats.com/500/500',
        id: 3
    },
    {
        name: 'Luna',
        age: 3,
        breed: 'Bengal',
        image: 'https://placecats.com/500/500',
        id: 4
    },];

    create(cat: Cat) {
        this.cats.push(cat);
    }

    findOne(id) {
        return this.cats.find((cat) => cat.id == id);
    }

    findAll(): Cat[] {
        console.log('findall cats called');
        return this.cats;
    }
}