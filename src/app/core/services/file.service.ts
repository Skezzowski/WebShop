import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Product } from '../models';
import { DataConverterService } from './util/data-converter.service';
import { FirebaseService } from './firebase.service';

@Injectable()
export class FileService {

    constructor(private firebase: FirebaseService, private converter: DataConverterService) { }

    updateProfilePicture(img: File): Observable<void> {
        return this.firebase.uploadProfilePicture(img);
    }

   uploadProduct(product: Product): Observable<void> {
      const rawProd = this.converter.convertProductToRawProduct(product);
      return this.firebase.uploadProductToStorage(product.id, rawProd);
   }
}
