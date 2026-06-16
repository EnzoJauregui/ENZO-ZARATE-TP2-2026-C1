import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailAvatar',
})
export class EmailAvatarPipe implements PipeTransform {
  transform(email: string): string {
    if (!email) return '??';
    return email.substring(0, 2).toUpperCase();
  }
}
