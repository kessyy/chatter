import {
  Component,
  Input,
  EventEmitter,
  OnInit,
  AfterViewInit,
  Output,
  forwardRef
} from '@angular/core';
import { FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

declare const $;

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SelectComponent),
    }
  ]
})
export class SelectComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  @Input() showLabel: boolean;
  @Input() selectLabel: string;
  @Input() selectTexts: string[];
  @Input() selectHeightClass: string;
  @Input() selectClass: string;
  @Input() form: FormGroup;
  @Input() invalidInput: any;
  @Input() defaultText: string;
  @Input() isSelectedBackground: boolean;
  @Output() valueChangedEvent = new EventEmitter<any>();
  input: string;

  constructor() { }

  ngOnInit() {
    $(document).on('change', 'select', e => {
      this.valueChangedEvent.emit({ value: e.target.value, elements: e.target.classList });
      $(e.target).next().addClass('default-select-option');
      if (this.isSelectedBackground) {
        $(e.target).next().addClass('is-selected');
      }
    });
  }

  ngAfterViewInit() {
    $('select').niceSelect();
  }

  onResetSelect(element: string, defaultValue: string) {
    $('.' + element).removeClass('is-selected');
    $('.' + element + ' .option').removeClass('selected');
    $('.' + element + ' .current').removeClass('default-select-option').text(defaultValue);
    $('select.' + element).get(0).selectedIndex = 0;
  }

  valueChanged(value: any) {
    this.onChange(value);
    this.onTouch();
  }

  onChange: any = () => { };
  onTouch: any = () => { };
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(input: string) {
    this.input = input;
  }
}
