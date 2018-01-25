import { TestBed } from '@angular/core/testing';
import { ProjectCreate2 } from './projectcreate2.component';
describe('Project Create 2 from Scratch', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            declarations: [ProjectCreate2]
        });
    });
    it('should instantiate properly', function () {
        var fixture = TestBed.createComponent(ProjectCreate2);
        expect(fixture.componentInstance instanceof ProjectCreate2).toBe(true, 'should create ProjectCreate2 component');
    });
});
//# sourceMappingURL=projectcreate2.component.spec.js.map