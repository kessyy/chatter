import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChange
} from '@angular/core';

@Component({
  selector: 'app-password-strength',
  templateUrl: 'password-strength.component.html',
  styleUrls: ['./password-strength.component.scss']
})

export class PasswordStrengthComponent implements OnChanges  {
  @Input() passwordToCheck: string;
  @Input() barLabel: string;
  @Output() passwordStrong = new EventEmitter<boolean>();
  bar0: string;
  bar1: string;
  bar2: string;
  bar3: string;
  bar4: string;

  private colors = ['darkred', 'orangered', 'orange', 'yellowgreen', 'green'];

  private measureStrength(pass: string) {
    let score = 0;
    const letters = {};
    for (let i = 0; i < pass.length; i++) {
      letters[pass[i]] = (letters[pass[i]] || 0) + 1;
      score += 5.0 / letters[pass[i]];
    }
    const variations = {
      digits: /\d/.test(pass),
      lower: /[a-z]/.test(pass),
      upper: /[A-Z]/.test(pass),
      nonWords: /\W/.test(pass),
      symbols: /[$-/:-?{-~!"^_@`\[\]]/g.test(pass)
    };

    let variationCount = 0;
    for (const check in variations) {
      variationCount += (variations[check]) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;
    return Math.trunc(score);
  }

  private getColor(score: number) {
    let idx = 0;
    if (score > 100) {
      idx = 5;
    } else if (score >= 90) {
      idx = 4;
    } else if (score >= 70) {
      idx = 3;
    } else if (score >= 40) {
      idx = 2;
    } else if (score >= 20) {
      idx = 1;
    }
    return {
      idx: idx + 1,
      col: this.colors[idx]
    };
  }

  ngOnChanges(changes: {[propName: string]: SimpleChange}): void {
    const password = changes['passwordToCheck'].currentValue;
    this.setBarColors(5, '#DDD');
    if (password) {
      const passwordStrength = this.measureStrength(password);
      const colour = this.getColor(passwordStrength);
      this.setBarColors(colour.idx, colour.col);
      passwordStrength > 50 ?
        this.passwordStrong.emit(true) :
        this.passwordStrong.emit(false);
    }
  }
  private setBarColors(count, col) {
    for (let i = 0; i < count; i++) {
      this['bar' + i] = col;
    }
  }
}
