import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

type OnlyOnError = false | ValidationErrors | null;

@Pipe({
  name: 'onlyOneError',
  standalone: true,
})
export class OneValidatorPipe implements PipeTransform {
  transform(
    allErrors: OnlyOnError,
    errorsPripority: string[]
  ): ValidationErrors | null {
    if (!allErrors) {
      return null;
    }

    const onlyOneError: OnlyOnError = {};

    errorsPripority.some(
      error => allErrors[error] && (onlyOneError[error] = allErrors[error])
    );

    return onlyOneError;
  }
}
