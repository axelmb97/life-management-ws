import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DatesHandlerService { 
  
  convertFromDateISO(iso: string | undefined) {
    if (!iso) return undefined;
    return iso.replace(
      /T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/,
      'T00:00:00.000Z'
    );
  }

  convertToDateISO(iso: string | undefined): string | undefined {
    if (!iso) return undefined;
  
    return iso.replace(
      /T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/,
      'T23:59:59.999Z'
    );
  }
}