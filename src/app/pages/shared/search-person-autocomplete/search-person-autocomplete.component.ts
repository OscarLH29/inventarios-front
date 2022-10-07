import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cliente} from '../../../model/interfaces/interfaces';
import {FormControl, Validators} from '@angular/forms';
import {DataService} from '../../../services/data.service';
import {InventoriesService} from '../../../services/inventories.service';

@Component({
  selector: 'app-search-person',
  templateUrl: './search-person-autocomplete.component.html',
  styleUrls: ['./search-person-autocomplete.component.scss']
})
export class SearchPersonAutocompleteComponent implements OnInit {
  @Input() filteredOptions: Cliente[] = [];
  @Input() source = 'Origen';
  @Output() selectedClient = new EventEmitter<Cliente>();
  selectedValue: any;
  autoComplete = new FormControl({value: '', disabled: false}, Validators.required);

  constructor(
    private dataService: DataService,
    private inventoriesService: InventoriesService,
  ) {
    this.autoComplete.valueChanges.subscribe(value => {
      this.selectedValue = typeof value === 'string' ? value : value.nombre;
      this.filterClient(this.selectedValue);
    });
  }

  ngOnInit(): void {
  }

  filterClient(value: any): void {
    this.dataService.setIsLoading(true);
    this.inventoriesService.getClientsByName(value)
      .subscribe((res) => {
        this.filteredOptions = res;
        this.dataService.setIsLoading(false);
      }, (error) => {
        this.dataService.setGeneralNotificationMessage(error);
        this.dataService.setIsLoading(false);
      });
  }

  selectedClientEvt(client: any): void {
    this.selectedClient.emit(client.option.value);
  }

  displayName(client): string {
    return client ? client.nombre : client;
  }

}
