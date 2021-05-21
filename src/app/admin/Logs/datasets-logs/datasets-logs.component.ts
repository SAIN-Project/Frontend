import { Component, OnInit, ViewChild } from "@angular/core";
import { AdminService } from "../../../services/admin.service";
import { DataTableDirective } from "angular-datatables";
import { DatatableUtil } from "../../../classes/DatatableUtil";

@Component({
  selector: 'app-datasets-logs',
  templateUrl: './datasets-logs.component.html',
  styleUrls: ['./datasets-logs.component.css']
})
export class DatasetsLogsComponent implements OnInit {
  Dt: DatatableUtil = new DatatableUtil();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  private logs: any = [];
  constructor(private admin: AdminService) {}

  ngOnInit(): void {
      this.admin.getDatasetslog().subscribe(
          (res) => {
              this.logs = res;
              this.Dt.triggerNext();
          },
          (error) => {
              console.log("error");
          }
      );
  }

}
