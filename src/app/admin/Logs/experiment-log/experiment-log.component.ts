import { Component, OnInit, ViewChild } from "@angular/core";
import { AdminService } from "../../../services/admin.service";
import { DataTableDirective } from "angular-datatables";
import { DatatableUtil } from "../../../classes/DatatableUtil";
@Component({
    selector: "app-experiment-log",
    templateUrl: "./experiment-log.component.html",
    styleUrls: ["./experiment-log.component.css"],
})
export class ExperimentLogComponent implements OnInit {
  Dt: DatatableUtil = new DatatableUtil();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  public logs: any = [];
  constructor(public admin: AdminService) {}

  ngOnInit(): void {
      this.admin.getExperimentslog().subscribe(
          (res) => {
              this.logs = res;
              this.Dt.triggerNext();
          },
          (error) => {
              console.log("error");
          }
      );
  }
  showMessage(id:any){
      this.admin.getExperimentslogMessage(id).subscribe(
        (res) => {
            alert(res.outputmessage)
        },
        (error) => {
            console.log("error");
        }

      );
  }
}
