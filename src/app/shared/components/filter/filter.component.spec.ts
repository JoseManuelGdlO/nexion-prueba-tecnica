import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from './filter.component';
import { Ifilters } from '../../interfaces/filters.interface';
import { IonicModule } from '@ionic/angular';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterComponent],
      imports: [FormsModule, IonicModule], // Importamos FormsModule para manejar ngModel
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
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
});