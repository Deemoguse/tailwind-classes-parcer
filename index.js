"use strict";
/// <reference path="index.d.ts" />
// ===========================================================
var lodash_1 = require("lodash");
// ===========================================================
var tailwind_class_compositor = /** @class */ (function () {
    function tailwind_class_compositor(obj) {
        this.obj = obj;
    }
    tailwind_class_compositor.prototype.result = function () {
        var _this = this;
        var result = lodash_1.keys(this.obj).map(function (key) {
            return [key, _this._handleValue(_this.obj[key])];
        });
        return lodash_1.fromPairs(result);
    };
    tailwind_class_compositor.prototype._handleValue = function (value) {
        switch (typeof value) {
            case 'string':
                return value ? value : undefined;
            case 'function':
                var result = value();
                return result ? result : undefined;
            case 'object':
                return this._handleObject(value);
            default:
                return undefined;
        }
    };
    tailwind_class_compositor.prototype._handleObject = function (obj) {
        var _this = this;
        var variants = lodash_1.omit(obj, ['base', 'custom']);
        var withPrefix = lodash_1.keys(variants).map(function (key) {
            var value = _this._handleValue(variants[key]);
            var result = value.match(/[\S]+/gi).map(function (el) { return key + ":" + el; });
            return result.join(' ');
        }).join(' ');
        return lodash_1.compact([this._handleValue(obj.base), withPrefix, obj.custom]).join(' ');
    };
    return tailwind_class_compositor;
}());
module.exports = function (obj) {
    return new tailwind_class_compositor(obj).result();
};
