import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from './filter.component';
import { Ifilters } from '../../interfaces/filters.interface';
import { IonicModule } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { LOGS_COLLECTION } from '../../utils/constants';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;

  beforeEach(async () => {
    // Crea un mock para el servicio
    const spy = jasmine.createSpyObj('StorageService', ['get', 'set']);

    await TestBed.configureTestingModule({
      declarations: [FilterComponent],
      imports: [FormsModule, IonicModule, IonicStorageModule.forRoot()],
      providers: [
        { provide: StorageService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
        
    // Asigna el spy creado al servicio
    storageServiceSpy = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;

    // Simula el retorno de los métodos get y set
    storageServiceSpy.get.and.returnValue(Promise.resolve([])); 
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize dates on ngOnInit', () => {
    component.ngOnInit();
    expect(component.startDate).toBeTruthy();
    expect(component.endDate).toBeTruthy();
  });

  it('should clear filters', () => {
    component.searchText = 'Test';
    component.startDate = '2024-01-01';
    component.endDate = '2024-12-31';
    component.categories = 'soda';

    component.clearFilters();

    expect(component.searchText).toBe('');
    expect(component.startDate).toBe(component.today);
    expect(component.endDate).toBe(component.today);
    expect(component.categories).toBe('');
  });

  it('should emit filters on applyFilters non dates include', () => {
    spyOn(component.onFiltersChanged, 'emit');

    component.searchText = 'Test';
    component.startDate = '2024-01-01';
    component.endDate = '2024-12-31';
    component.categories = 'Send';

    component.applyfilters();

    const expectedFilters: Ifilters = {
      searchText: 'Test',
      startDate: '',
      endDate: '',
      category: 'Send'
    };

    expect(component.onFiltersChanged.emit).toHaveBeenCalledWith(expectedFilters);
  });

  it('should emit filters on applyFilters dates include', () => {
    spyOn(component.onFiltersChanged, 'emit');

    component.searchText = 'Test';
    component.startDate = '2024-01-01';
    component.endDate = '2024-12-31';
    component.categories = 'Send';

    component.includeDates = true;

    component.applyfilters();

    const expectedFilters: Ifilters = {
      searchText: 'Test',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      category: 'Send'
    };

    expect(component.onFiltersChanged.emit).toHaveBeenCalledWith(expectedFilters);
  });


  it('should properly update filters when text changes', () => {
    spyOn(component, 'applyfilters');

    component.textChange();

    expect(component.applyfilters).toHaveBeenCalled();
  });

  it('should log filter changes correctly', async () => {
    // Spy on the console log
    spyOn(console, 'log');
    
    // Simulate stored logs, explicitly typing it as an array of log objects
    const storedLogs: Array<{ appliedFilters: Ifilters, timestamp: string }> = [];
    storageServiceSpy.get.and.returnValue(Promise.resolve(storedLogs));

    // Set filter values and apply filters
    component.searchText = 'lacteos';
    component.startDate = '2024-01-01T12:00:00.000Z';
    component.endDate = '2024-01-02T12:00:00.000Z';
    component.categories = 'Refrescos';
    component.includeDates = true;

    // Call applyfilters to trigger log creation
    await component.applyfilters();

    // Verify the log was generated correctly
    expect(console.log).toHaveBeenCalledWith('Filter Log:', {
      appliedFilters: {
        searchText: 'lacteos',
        startDate: '2024-01-01',
        endDate: '2024-01-02',
        category: 'Refrescos'
      },
      timestamp: jasmine.any(String) // Check that the timestamp is a string
    });

    // Check if the log was stored
    expect(storageServiceSpy.get).toHaveBeenCalledWith(LOGS_COLLECTION);
    expect(storageServiceSpy.set).toHaveBeenCalledWith(LOGS_COLLECTION, jasmine.any(Array));
});
});