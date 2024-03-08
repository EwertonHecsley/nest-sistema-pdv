import { Injectable } from '@nestjs/common';
import * as mustache from 'mustache';

@Injectable()
export class MustacheService {
    render(template: string, variaveis: any) {
        return mustache.render(template, variaveis);
    }
}
