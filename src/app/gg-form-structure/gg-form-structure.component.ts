import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputComponentDragService } from '../input-component-drag.service';
import { SelectedFormElementService } from '../selected-form-element.service';

// Shared Interface for form component metadata
export interface FormComponent {
  type: string;
  metadata: any;
  children?: FormComponent[];
}

@Component({
  selector: 'app-gg-form-structure',
  imports: [CommonModule],
  templateUrl: './gg-form-structure.component.html',
  styleUrl: './gg-form-structure.component.scss',
  standalone: true
})
export class GgFormStructureComponent {
  @Input() components: any = [];
  @Output() structureChanged = new EventEmitter<any[]>();


  constructor(private inputComponentDragService: InputComponentDragService,
    private selectedFormElementService: SelectedFormElementService
  ) { }
  onDragOver(event: DragEvent, c?: any) {
    event.preventDefault(); // Necessary to allow dropping

  }


  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const data = this.inputComponentDragService.getData();

    const newItem = {
      ...data,
      components: ['FORM_GROUP', 'FORM_ARRAY'].includes(data.type) ? [] : undefined
    };


    this.components.push(newItem);

    // 🚀 Emit updated structure to parent
    this.structureChanged.emit(this.components);
  }



  componentSelected(event: Event, c: any) {
    event.stopPropagation();
    console.log('Component selected:', c);
    this.selectedFormElementService.selectedElement = c;
  }




}
