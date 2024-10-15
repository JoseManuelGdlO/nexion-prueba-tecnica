import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpService } from 'src/app/shared/services/http.service';
import { HomePage } from './home.page';
import { of } from 'rxjs';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { Ifilters } from 'src/app/shared/interfaces/filters.interface';
import { InfiniteScrollCustomEvent, IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

describe('HomePage', () => {
    let component: HomePage;
    let fixture: ComponentFixture<HomePage>;
    let httpService: jasmine.SpyObj<HttpService>;

    beforeEach(async () => {
        const httpServiceSpy = jasmine.createSpyObj('HttpService', ['getProducts']);

        await TestBed.configureTestingModule({
            declarations: [HomePage],
            imports: [IonicModule, SharedModule],
            providers: [
                { provide: HttpService, useValue: httpServiceSpy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HomePage);
        component = fixture.componentInstance;
        httpService = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load products on init', () => {
        const mockProducts: IProduct[] = [
            { id: 1, product: 'Product A', category: 'Category 1', add_date: '2024-10-01' },
            { id: 2, product: 'Product B', category: 'Category 2', add_date: '2024-10-02' },
        ];
        httpService.getProducts.and.returnValue(of(mockProducts));

        component.ngOnInit();

        expect(component.filteredItems).toEqual(mockProducts);
        expect(component.originalData).toEqual(mockProducts);
        expect(component.ItemsInView.length).toBe(2);
    });

    it('should filter products based on filters', () => {
        const mockProducts: IProduct[] = [
            { id: 1, product: 'Product A', category: 'Category 1', add_date: '2024-10-01' },
            { id: 2, product: 'Product B', category: 'Category 2', add_date: '2024-10-02' },
            { id: 3, product: 'Product C', category: 'Category 1', add_date: '2024-10-03' },
        ];
        component.originalData = mockProducts;

        const filters: Ifilters = {
            searchText: 'Product A',
            category: 'Category 1',
            startDate: '2024-09-30',
            endDate: '2024-10-02',
        };

        component.onFiltersChanged(filters);

        expect(component.ItemsInView.length).toBe(1);
        expect(component.ItemsInView[0].product).toBe('Product A');
    });

    it('should update displayed items correctly', () => {
        const mockProducts: IProduct[] = [
            { id: 1, product: 'Product A', category: 'Category 1', add_date: '2024-10-01' },
            { id: 2, product: 'Product B', category: 'Category 2', add_date: '2024-10-02' },
            { id: 3, product: 'Product C', category: 'Category 1', add_date: '2024-10-03' },
        ];
        component.filteredItems = mockProducts;
        component.totalShowing = 2;
        component.currentIndex = 0;

        component.updateDisplayedItems();

        expect(component.ItemsInView.length).toBe(2);
        expect(component.ItemsInView).toEqual(mockProducts.slice(0, 2));
    });

});
