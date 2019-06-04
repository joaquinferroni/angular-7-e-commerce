export class Menu {
  Id: number;
  Nombre: string;
  Url: string;
  Icono: string;
  Orden: number;

  constructor(Id: number, Nombre: string, Url: string, Icono: string, Orden: number){
    this.Id = Id;
    this.Nombre = Nombre;
    this.Url = Url;
    this.Icono = Icono;
    this.Orden = Orden;
  }
}

export class UsuarioInfo {
  Id: number;
  Usuario: string;
  RazonSocial: string;
  Token: string;

  constructor(token: string, id: number, razonSocial: string, usuario: string){
    this.Token = token;
    this.Id = id;
    this.Usuario = usuario || razonSocial;
    this.RazonSocial = razonSocial;
  }
}

export class CustomerDetail{
      id: number;
      code: string;
      socialReazon: string;
      cuil: string;
      email: string;
      ivaDetailed: boolean;
      account: boolean;
      credit: number;
      list: string;
      seller: string;
      sellerEmail: string;
      dollar: number;
      token: string;
      paymentConditionId: number;
      paymentConditionDescription: string;
      paymentTypeId: number;
      paymentTypeDescription: string;
      moneyId: string;
}
