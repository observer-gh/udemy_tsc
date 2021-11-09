class Snacks {
    // snackName: string;
    // snackType: SnackTypes;
    // private quantity: number =0;

    constructor(snackName:string="snack" , public snackType:SnackTypes="Cookie", private quantity:number=0){
        // this.snackName = snackName;
        // this.snackType =snackType;
        // this.quantity = quantity
    }
    changeQuantity(n:number){
        console.log(this)
        this.quantity = n;
    }
};

type SnackTypes = "Biscuit"| "Cookie"| "Mereung";

class Cookie extends Snacks {
    constructor(){
        super()
    }
}

const coo = new Cookie();
console.log(coo);