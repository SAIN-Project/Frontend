import { PageEvent } from '@angular/material/paginator';
import { saveAs } from 'file-saver'

export class PaginatorConfigurations {
  length: number = 100;
  pageSize: number = 10;
  pageSizeOptions: number[] = [10, 50, 25, 100];
  CurrentIndex = 0;
  pageEvent: PageEvent;
  constructor() {

  }

}
export function fileSizeFormat(size: string): string {
  var x: number = parseInt(size)
  var unit = "Kb";
  if (x < 1024) {
    return x + ' ' + 'Kb';
  }
  if (x < 1024 * 1024) {
    x = x / (1024) * 100;
    x = Math.round(x) / 100;
    return x + ' ' + 'Mb'
  }
  if (x < 1024 * 1024 * 1024) {
    x = x / (1024 * 1024) * 100;
    x = Math.round(x) / 100;
    return x + ' ' + 'Gb'
  }
}
export class DataImportExport {
  async importFromJson(event,target) {
    var result:string;
    if (event.target.files.length > 0) {
      var file = <File>event.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsText(file, "UTF-8");
      fileReader.onloadend = () => {
       result= <string>fileReader.result;
       target=JSON.parse(result)
       return target;
      };
      fileReader.onerror = (error) => {
        console.log(error);
      };
    }
    
  }
  exportToJson(data, filename) {
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    saveAs(blob, filename + '.json');
  }
}