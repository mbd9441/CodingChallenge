"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var employee_component_1 = require("./employee.component");
var CardComponent = /** @class */ (function () {
    function CardComponent() {
    }
    CardComponent = __decorate([
        core_1.Component({ selector: 'mat-card', template: '' })
    ], CardComponent);
    return CardComponent;
}());
var CardHeaderComponent = /** @class */ (function () {
    function CardHeaderComponent() {
    }
    CardHeaderComponent = __decorate([
        core_1.Component({ selector: 'mat-card-header', template: '' })
    ], CardHeaderComponent);
    return CardHeaderComponent;
}());
var CardTitleComponent = /** @class */ (function () {
    function CardTitleComponent() {
    }
    CardTitleComponent = __decorate([
        core_1.Component({ selector: 'mat-card-title', template: '' })
    ], CardTitleComponent);
    return CardTitleComponent;
}());
var CardSubtitleComponent = /** @class */ (function () {
    function CardSubtitleComponent() {
    }
    CardSubtitleComponent = __decorate([
        core_1.Component({ selector: 'mat-card-subtitle', template: '' })
    ], CardSubtitleComponent);
    return CardSubtitleComponent;
}());
var CardContentComponent = /** @class */ (function () {
    function CardContentComponent() {
    }
    CardContentComponent = __decorate([
        core_1.Component({ selector: 'mat-card-content', template: '' })
    ], CardContentComponent);
    return CardContentComponent;
}());
var employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getAll', 'get', 'save', 'remove']);
describe('EmployeeComponent', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                employee_component_1.EmployeeComponent,
                CardComponent,
                CardHeaderComponent,
                CardTitleComponent,
                CardSubtitleComponent,
                CardContentComponent
            ],
        }).compileComponents();
    }));
    it('should create the component', testing_1.async(function () {
        var fixture = testing_1.TestBed.createComponent(employee_component_1.EmployeeComponent);
        var comp = fixture.debugElement.componentInstance;
        comp.employee = {
            id: 1,
            firstName: 'first',
            lastName: 'last',
            position: 'jobTitle'
        };
        expect(comp).toBeTruthy();
    }));
});
//# sourceMappingURL=employee.component.spec.js.map