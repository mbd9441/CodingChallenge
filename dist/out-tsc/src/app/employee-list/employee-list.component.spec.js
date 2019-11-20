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
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var employee_list_component_1 = require("./employee-list.component");
var employee_service_1 = require("../employee.service");
var EmployeeComponent = /** @class */ (function () {
    function EmployeeComponent() {
    }
    __decorate([
        core_1.Input('employee'),
        __metadata("design:type", Object)
    ], EmployeeComponent.prototype, "employee", void 0);
    EmployeeComponent = __decorate([
        core_1.Component({ selector: 'app-employee', template: '' })
    ], EmployeeComponent);
    return EmployeeComponent;
}());
var GridListComponent = /** @class */ (function () {
    function GridListComponent() {
    }
    GridListComponent = __decorate([
        core_1.Component({ selector: 'mat-grid-list', template: '' })
    ], GridListComponent);
    return GridListComponent;
}());
var GridTileComponent = /** @class */ (function () {
    function GridTileComponent() {
    }
    GridTileComponent = __decorate([
        core_1.Component({ selector: 'mat-grid-tile', template: '' })
    ], GridTileComponent);
    return GridTileComponent;
}());
var employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getAll', 'get', 'save', 'remove']);
describe('EmployeeListComponent', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                employee_list_component_1.EmployeeListComponent,
                EmployeeComponent,
                GridListComponent,
                GridTileComponent
            ],
            providers: [
                { provide: employee_service_1.EmployeeService, useValue: employeeServiceSpy }
            ],
        }).compileComponents();
    }));
    it('should create the component', testing_1.async(function () {
        var fixture = testing_1.TestBed.createComponent(employee_list_component_1.EmployeeListComponent);
        var comp = fixture.debugElement.componentInstance;
        expect(comp).toBeTruthy();
    }));
});
//# sourceMappingURL=employee-list.component.spec.js.map