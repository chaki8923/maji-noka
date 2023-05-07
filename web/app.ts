
function Log4(target: any, name: string | symbol, positionNumber: number) {
  console.log("パラメーターデコレーターだYO");
  console.log(name);
  console.log(positionNumber);
}

class Product {
  title: string;
  private _price: number

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  taxWithPrice(@Log4 tax: number) {
    return this._price + (1 * tax);

  }
}