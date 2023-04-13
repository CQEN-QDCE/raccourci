import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Método de exemplo do framework
   * @returns 
   */
  @Get()
  getHello(@Res() response) {
    response.redirect("https://exp-port-e-raccourci.apps.exp.openshift.cqen.ca/api");
    //return this.appService.getHello();
  }

  /**
   * Redireciona a resposta para a página linkada no URL longo. 
   * @param id URL longo registrada no banco de dados e relacionada ao shortURL recebido
   * @param response objeto http response do express utilizado para fazer o encaminhamento à página de destino
   */
  @Get(':uniqueId')
  getUrlRedirect(@Param('uniqueId') uniqueId: string, @Res() response){
    this.appService.getUrlRedirect(uniqueId, response); 
  }
}
