import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Ifilters } from "../../interfaces/filters.interface";


/**
 * Componente de Filtros para la aplicación.
 * Permite a los usuarios aplicar filtros a una tabla de datos,
 * incluyendo búsqueda de texto, rango de fechas y selección de categorías.
 */
@Component({
    selector: 'nex-filter',
    templateUrl: 'filter.component.html',
    styleUrls: ['filter.component.scss'],
})
export class FilterComponent implements OnInit {
    // Evento emitido cuando los filtros cambian
    @Output() onFiltersChanged = new EventEmitter<Ifilters>();


    // Variables para los filtros
    searchText = ''; // Texto de búsqueda
    startDate: string = ''; // Fecha de inicio del filtro
    endDate: string = ''; // Fecha de fin del filtro
    categories: string = ''; // Categoría seleccionada
    includeDates: boolean = false; // Indica si se incluirán fechas en los filtros

    // Fecha de hoy, inicializada en ngOnInit
    today: string = '';

    // Objeto que contiene los filtros aplicados
    filters: Ifilters = {
        searchText: '',
        startDate: '',
        endDate: '',
        category: ''
    }

    /**
    * Método del ciclo de vida del componente que se ejecuta al inicializar.
    * Establece la fecha de hoy y la inicializa como el rango de fechas.
    */
    ngOnInit() {
        this.today = new Date().toISOString();
        this.startDate = this.today;
        this.endDate = this.today;
    }

    /**
     * Método que se ejecuta cada vez que el texto de búsqueda cambia.
     * Llama a applyfilters para aplicar los filtros con el texto actualizado.
     */
    textChange() {
        this.applyfilters();
    }

    /**
     * Método que restablece todos los filtros a sus valores por defecto.
     * Limpia el texto de búsqueda y reinicia las fechas al día actual.
     */
    clearFilters() {
        this.searchText = '';
        this.startDate = this.today;
        this.endDate = this.today;
        this.categories = '';
        this.includeDates = false;
        this.applyfilters();
    }

    /**
     * Método que aplica los filtros actuales y emite el evento onFiltersChanged.
     * Actualiza el objeto filters con los valores actuales de búsqueda, fechas y categoría.
     */
    applyfilters() {
        // Asigna los valores actuales a el objeto filters
        this.filters = {
            searchText: this.searchText,
            startDate: this.includeDates ? this.startDate.split('T')[0] : '',
            endDate: this.includeDates ? this.endDate.split('T')[0] : '',
            category: this.categories
        }
        // Emite el evento con los filtros aplicados
        this.onFiltersChanged.emit(this.filters);
    }

}