import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {defaultRollable, IRollable} from "../../domain/data/Rollable";
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {Selectable} from "../../Helpers";
import * as _ from "lodash";

@Component({
  selector: 'app-rollable-selector',
  templateUrl: './rollable-selector.component.html',
  styleUrls: ['./rollable-selector.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class RollableSelectorComponent implements OnChanges {
  @Input()
  Rollables: IRollable[] = [];
  @Input()
  Name: string = "";
  SelectForm: FormGroup<{[key:string]: FormControl<boolean | null>}>;

  @Output()
  SelectedRollables:EventEmitter<Selectable<IRollable>[]> = new EventEmitter<Selectable<IRollable>[]>();

  constructor()
  {
    this.SelectForm = new FormGroup<{[key:string]: FormControl<boolean | null>}>({});
  }

  GetFormLabel()
  {
    if(!_.chain(this.SelectForm.controls).some(c => c.value == true).value())
    {
      return `Select ${this.Name}`;
    }
    else
    {
      return _.chain(this.SelectForm.controls)
        .keys()
        .filter(c => this.SelectForm.controls[c].value == true)
        .join(", ")
        .value();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes?.['Rollables'])
    {
      let formControls:{[key:string]: FormControl<boolean | null>} = {};
      console.log(this.Rollables)
      for(let rollable of this.Rollables)
      {
        formControls[rollable.name] = new FormControl(false, Validators.required);
      }
      this.SelectForm = new FormGroup(formControls);
    }
  }

  OnFormChange()
  {
    let selectedValues = _.chain(Object.keys(this.SelectForm.controls)).map(k => {
      return {
        isSelected: this.SelectForm.controls[k].value ?? false,
        item: this.Rollables.find(r => r.name == k) || defaultRollable
      }
    }).value();
    this.SelectedRollables.emit(selectedValues);
  }
}
