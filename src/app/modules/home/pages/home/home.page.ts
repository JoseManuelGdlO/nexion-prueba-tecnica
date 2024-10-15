import { Component, OnInit } from "@angular/core";
import { InfiniteScrollCustomEvent } from "@ionic/angular";
import { Ifilters } from "src/app/shared/interfaces/filters.interface"; 
import { IProduct } from "src/app/shared/interfaces/product.interface"; 
import { HttpService } from "src/app/shared/services/http.service";

/**
 * Componente de la página principal de la aplicación.
 * Este componente muestra una lista de productos que se pueden filtrar y cargar de forma infinita.
 */
@Component({
    selector: 'app-home', 
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    // Propiedades del componente
    originalData: IProduct[] = []; // Array para almacenar los productos originales antes de aplicar filtros
    filteredItems: IProduct[] = []; // Array para almacenar todos los productos obtenidos
    ItemsInView: IProduct[] = []; // Array para almacenar los productos filtrados que se mostrarán en la vista

    totalShowing = 6; // Número total de elementos a mostrar inicialmente
    currentIndex = 0; // Índice actual para el paginado

    // Constructor que inyecta el servicio HTTP
    constructor(private httpService: HttpService) { }

    // Método del ciclo de vida de Angular que se ejecuta al inicializar el componente
    ngOnInit(): void {
        // Llama al servicio HTTP para obtener los productos
        this.httpService.getProducts()
            .subscribe((data: IProduct[]) => {
                this.filteredItems = data; // Almacena los productos obtenidos en 'items'
                this.originalData = data; // Almacena los productos originales en 'originalData'
                this.updateDisplayedItems(); // Actualiza los elementos mostrados en la vista
            });
    }

    /**
     * Método que se ejecuta cuando cambian los filtros.
     * @param filters - Objeto que contiene los filtros aplicados por el usuario.
     */
    onFiltersChanged(filters: Ifilters) {
        // Reinicia los elementos y el índice actual
        this.filteredItems = this.originalData; // Resetea 'items' a los productos originales
        this.currentIndex = 0; // Resetea el índice a 0
        this.updateDisplayedItems(); // Actualiza los elementos mostrados en la vista

        // Filtra los productos según los filtros proporcionados
        this.filteredItems = this.originalData.filter(item => {
            // Filtrado por texto
            const matchesText = !filters.searchText || item.product.toLowerCase().includes(filters.searchText.toLowerCase());

            // Filtrado por categoría
            const matchesCategory = !filters.category || item.category === filters.category;

            // Filtrado por fecha
            const matchesDate = (!filters.startDate || item.add_date >= filters.startDate) &&
                (!filters.endDate || item.add_date <= filters.endDate);

            // Retorna true si el producto cumple con todos los filtros
            return matchesText && matchesCategory && matchesDate;
        });

        this.updateDisplayedItems(); // Actualiza los elementos mostrados después de aplicar filtros
    }

    /**
     * Método que se ejecuta al activar el evento de desplazamiento infinito.
     * @param ev - Evento de desplazamiento infinito.
     */
    onIonInfinite(ev: InfiniteScrollCustomEvent) {
        this.currentIndex += this.totalShowing; // Incrementa el índice actual según el número de elementos a mostrar
        setTimeout(() => {
            this.updateDisplayedItems(); // Actualiza los elementos mostrados
            ev.target.complete(); // Completa el evento de desplazamiento infinito
        }, 500); // Simula un retraso de 500 ms para la carga de más elementos
    }

    /**
     * Método privado que actualiza los elementos mostrados en la vista.
     */
    updateDisplayedItems() {
        // Actualiza el array 'filteredItems' con una porción de 'items' según el índice actual
        this.ItemsInView = this.filteredItems.slice(0, this.currentIndex + this.totalShowing);
    }
}
