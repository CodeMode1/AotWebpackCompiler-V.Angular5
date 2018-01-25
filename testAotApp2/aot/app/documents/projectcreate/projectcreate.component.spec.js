"use strict";
//import { CommonModule } from "@angular/common";
//import { FormsModule, ReactiveFormsModule } from "@angular/forms";
//import { FormBuilder } from "@angular/forms";
//import { RouterModule } from "@angular/router";
//import { Router } from "@angular/router";
//import { SharedModule } from "../../shared/shared.module";
//import { ConfigurationsModule } from "../../configurations/configurations.module";
//import { ConfigurationService } from "../../configurations/Configurations.service";
//import { Project, IProject } from '../project';
//import { ProjectService } from "../project.service";
//import { ProjectCreateComponent } from "./projectcreate.component";
//import { TestBed, ComponentFixture, async } from "@angular/core/testing";
//import { By } from "@angular/platform-browser";
//import { DebugElement } from "@angular/core";
//import { RouterStub } from "../../../test/routerstub";
//import { ConfigurationsServiceMock } from "../../../test/configurations.servicemock";
//import { ProjectsServiceMock } from "../../../test/projects.servicemock";
//describe('Project Create Component (external template)', () => {
//    // cut - Component Under Test
//    let cut: ProjectCreateComponent;
//    let fixture: ComponentFixture<ProjectCreateComponent>;
//    // The literature talks about using asynchronous TestBed creation due to the 
//    //    asynchronous load of the HTML template saved in a separate file.
//    // Fortunately, this is not required when using webpack because it has already
//    //    merged the HTML into the generated bundle. So no separate file to load
//    //    and no need for asynchronous setup.
//    beforeEach(() => {
//        // Declare the Angular testing module with the component under test.
//        TestBed.configureTestingModule({
//            imports: [
//                CommonModule,
//                FormsModule,
//                ReactiveFormsModule,
//                RouterModule,
//                SharedModule,
//                ConfigurationsModule
//            ],
//            declarations: [ProjectCreateComponent],
//            providers: [
//                FormBuilder,
//                { provide: ConfigurationService, useClass: ConfigurationsServiceMock },
//                { provide: ProjectService, useClass: ProjectsServiceMock },
//                { provide: Router, useClass: RouterStub }
//            ]
//        });
//        // This creates the CUT and thus call its constructor.
//        fixture = TestBed.createComponent(ProjectCreateComponent);
//        // This first change detection triggers ngOnInit to complete component initialization.
//        fixture.detectChanges();
//        // Keep the component test instance reference to simplify the tests.
//        cut = fixture.componentInstance;
//    });
//    it('should display title New Project', () => {
//        const debugElement: DebugElement = fixture.debugElement.query(By.css('h3'));
//        const headerText : string = debugElement.nativeElement.textContent;
//        expect(headerText).toContain('New Project');
//    });
//    it('should be invalid', () => {
//        // Get the references on the reactive form controls.
//        const numberControl = cut.createForm.get("number");
//        const nameControl = cut.createForm.get("name");
//        const confidentialControl = cut.createForm.get("confidential");
//        // Check their statuses, they should all be invalid, the form included.
//        expect(numberControl.status).toBe('INVALID', 'number should be INVALID');
//        expect(nameControl.status).toBe('INVALID', 'name should be INVALID');
//        expect(confidentialControl.status).toBe('INVALID', 'confidential should be INVALID');
//        expect(cut.createForm.status).toBe('INVALID', 'form should be INVALID');
//    });
//    function enterHtmlInput(inputId: string, inputValue: string) {
//        const htmlInput: HTMLInputElement = fixture.debugElement.query(By.css(`#${inputId}`)).nativeElement;
//        htmlInput.value = inputValue;
//        // Dispatch a DOM event so that Angular learns of input value change.
//        htmlInput.dispatchEvent(new Event('input'));
//    }
//    it('should accept valid number entry', () => {
//        const inputString: string = 'Valid number 1';
//        enterHtmlInput('number', inputString);
//        fixture.detectChanges();
//        const entryControl = cut.createForm.get("number");
//        expect(entryControl.value).toBe(inputString, `number should be ${inputString}`);
//        expect(entryControl.status).toBe('VALID', 'number should be VALID');
//        expect(cut.createForm.status).toBe('INVALID', 'form should be INVALID');
//    });
//    it('should accept valid name entry', () => {
//        const inputString: string = 'Valid name 17';
//        enterHtmlInput('name', inputString);
//        fixture.detectChanges();
//        const entryControl = cut.createForm.get("name");
//        expect(entryControl.value).toBe(inputString, `name should be ${inputString}`);
//        expect(entryControl.status).toBe('VALID', 'name should be VALID');
//        expect(cut.createForm.status).toBe('INVALID', 'form should be INVALID');
//    });
//    it('should accept valid confidential entry', () => {
//        const radioGroupRef: DebugElement = fixture.debugElement.queryAll(By.css('.radioGroup'))[0];
//        const radioInputRef: DebugElement = radioGroupRef.children[1];
//        //radioInputRef.nativeElement.checked = true;
//        radioInputRef.nativeElement.click();
//        //// Dispatch a DOM event so that Angular learns of input value change.
//        radioInputRef.nativeElement.dispatchEvent(new Event('click'));
//        fixture.detectChanges();
//        const entryControl = cut.createForm.get("confidential");
//        expect(entryControl.value).toBe('true', 'confidential should be true');
//        expect(entryControl.status).toBe('VALID', 'name should be VALID');
//        expect(cut.createForm.status).toBe('INVALID', 'form should be INVALID');
//    });
//    it('should submit new project', () => {
//        // Supply all mandatory fields with valid values.
//        enterHtmlInput('number', 'Project Number 1');
//        enterHtmlInput('name', 'Project Name 7');
//        const radioGroupRef: DebugElement = fixture.debugElement.queryAll(By.css('.radioGroup'))[0];
//        const radioInputRef: DebugElement = radioGroupRef.children[1];
//        //radioInputRef.nativeElement.checked = true;
//        radioInputRef.nativeElement.click();
//        fixture.detectChanges();
//        expect(cut.createForm.status).toBe('VALID', 'form should be VALID');
//        // Put a spy on the router to ensure successful project creation
//        //    by tracking the navigation to the project edit route.
//        const router = TestBed.get(Router);    // Get the injected router.
//        const spy = spyOn(router, 'navigate');
//        // Simulate user submit the creation of the project.
//        const submitButtonRef: DebugElement = fixture.debugElement.queryAll(By.css('.btn'))[0];
//        submitButtonRef.nativeElement.click();
//        fixture.detectChanges();
//        fixture.whenStable().then(() => {
//            fixture.detectChanges();
//            // After successful creation, the form is reset and thus invalid.
//            expect(cut.createForm.status).toBe('INVALID', 'form should be INVALID');
//            expect(spy.calls.any()).toBe(true, 'should call router navigate');
//        });
//    });
//}); 
//# sourceMappingURL=projectcreate.component.spec.js.map