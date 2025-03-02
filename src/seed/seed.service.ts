import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    private readonly pokemonService: PokemonService,

    private readonly http: AxiosAdapter,
  
  ) {}


  async executeSeed() {
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=50')

    const insertPromisesArray = []

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no:number = +segments[segments.length - 2]

      console.log(name, no);
      const pokemon:CreatePokemonDto = {
        name,
        no
      }
      this.pokemonService.create(pokemon)
      
    })
    return data.results;
  }

}
