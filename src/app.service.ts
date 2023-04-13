import { Header, HttpException, HttpStatus, Injectable, Param, Res } from '@nestjs/common';
import { ShortUrlService } from './short-url/short-url.service';

@Injectable()
export class AppService {

  constructor(
    //@InjectRepository(ShortUrl)
    private readonly shortService: ShortUrlService,
  ){}

  getHello(): string {
    return "<h1>Raccourci</h1> <br> Generateur d'url raccourcie pour développement";
  }

  @Header('Content-Type', 'text/plain')
  async getUrlRedirect(@Param('uniqueId') uniqueId: string, @Res() response){

    try{
      let shortUrl = await this.shortService.findUnique(uniqueId);
      
      if(!shortUrl){
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }

      let adresse = shortUrl.originalUrl;
      console.log(adresse);

      response.send(adresse);
      
    } catch(error){
      //console.log("CATCH: ", error);
      response.status(404).send("Lien non trouvé; vérifiez le lien que vous devez soumettre.");
    } 
  }
}
