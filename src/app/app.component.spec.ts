import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {CountriesService} from './services/countries.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {Country} from './models/Country';

/**
 * the describe function is part of the jasmine framework and it's used
 * to define a test suite.
 * it takes two parameters
 * @param description which describes the component under test in text
 * @param specDefinition which includes the actual test suite
 */
describe('AppComponent', () => {
  /**
   * first declared variable is the component under test
   */
  let component: AppComponent;
  /**
   * Fixture is the test environment for the component above,
   * it provides access to the component itself
   */
  let fixture: ComponentFixture<AppComponent>;
  /**
   * The component's rendered HTML is represented in the Debug element
   */
  let debugElement: DebugElement;
  /**
   * declare any mocks/spies here
   */
  let countriesServiceSpy: CountriesService;

  const dummyCounties: Array<Country> = [
    {name: 'Egypt', flag: 'c/cf/Flag_of_Egypt.svg', population: 100000000, area: 1234}
  ];

  /**
   * like junit, before each is a function that will execute right before your tests do
   */
  beforeEach(async () => {
    /**
     * a test bed is an angular module specific for this test environment to test  this component.
     * the configureTestingModule function is used to pass on any configuration specific to the TestBed
     * or the module before the tests starts running.
     */
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      /**
       * here we're specify the component we would like to test in isolation. meaning that,
       * when the TestBed is created the AppComponent will be present there and not just
       * a mock.
       */
      declarations: [
        AppComponent
      ],
      /**
       * here we're specifying all the modules that we need to import in our testing module for
       * it to run without issues.
       */
      imports: [
        NgbModule,
        RouterModule.forRoot([])
      ],
      /**
       * allows your testing module to include non angular modules.
       * this can be removed if everything included in your angular is native to angular itself
       */
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      /**
       * here we specify any mock object that we would like to inject in our testing module
       */
      providers: [
        CountriesService
      ]
    }).compileComponents(); // compiles the template and the CSS
  });

  /**
   * another before each block, it contains all variables setting that will be used for testing.
   * it's separated form the previous beforeEach for readability.
   */
  beforeEach(() => {
    /**
     * set up your spy here
     * there are two ways to configure mocks when testing angular
     *
     * the first approach is to use fakes:
     *  Fakes are dummy classes created manually and in which we implemented the desired mock behavior
     *  Fakes are useful when mocking simple services.
     *
     * the second approach is spying :
     *  a Spy is a class that listens to the calls made to the actual injected dependency then
     *  intercepts the call and returns a mock response
     *
     * in the below example we're using spying to listen to the authentication service and always return
     * true for any call made to that service
     */
    countriesServiceSpy = TestBed.get(CountriesService);
    spyOn(countriesServiceSpy, 'getCountries').and.returnValue(dummyCounties);

    // initializes the test fixture 'test environment'
    fixture = TestBed.createComponent(AppComponent);
    // use this variable to test the component in isolation
    component = fixture.componentInstance;
    // use this variable to test the component's rendered HTML
    debugElement = fixture.debugElement;

    // runs angular change detection
    fixture.detectChanges();
  });

  // tests that component creation happens successfully
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
