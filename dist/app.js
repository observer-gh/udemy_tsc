"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Snacks = /** @class */ (function () {
    // snackName: string;
    // snackType: SnackTypes;
    // private quantity: number =0;
    function Snacks(snackName, snackType, quantity) {
        if (snackName === void 0) { snackName = "snack"; }
        if (snackType === void 0) { snackType = "Cookie"; }
        if (quantity === void 0) { quantity = 0; }
        this.snackType = snackType;
        this.quantity = quantity;
        // this.snackName = snackName;
        // this.snackType =snackType;
        // this.quantity = quantity
    }
    Snacks.prototype.changeQuantity = function (n) {
        console.log(this);
        this.quantity = n;
    };
    return Snacks;
}());
;
var Cookie = /** @class */ (function (_super) {
    __extends(Cookie, _super);
    function Cookie() {
        return _super.call(this) || this;
    }
    return Cookie;
}(Snacks));
var coo = new Cookie();
console.log(coo);
