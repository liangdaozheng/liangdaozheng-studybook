"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
// function L(type:string){
//   return function(target:Function){
//     Reflect.defineMetadata('type',type,target)
//   }
// }
function log(type) {
    return function (target, name, descriptor) {
        var fn = descriptor.value;
        descriptor.value = function (a, b) {
            var res = fn(a, b);
            var _type = type;
            if (!_type) {
                if (typeof target === "function") {
                    _type = Reflect.getMetadata('type', target);
                }
                else {
                    _type = Reflect.getMetadata('type', target.constructor);
                }
                // _type=typeof target === "function" ? target.prototype.type : target.type
            }
            console.log("日志", {
                name: name,
                res: res,
                type: _type
            });
            return res;
        };
    };
}
var M = /** @class */ (function () {
    function M() {
    }
    M.add = function (a, b) {
        return a + b;
    };
    M.sub = function (a, b) {
        return a - b;
    };
    __decorate([
        log(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Number]),
        __metadata("design:returntype", void 0)
    ], M, "add", null);
    __decorate([
        log("storage"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Number]),
        __metadata("design:returntype", void 0)
    ], M, "sub", null);
    M = __decorate([
        Reflect.metadata('type', 'storage')
    ], M);
    return M;
}());
var v1 = M.add(1, 2);
console.log(v1);
var v2 = M.sub(1, 2);
console.log(v2);
