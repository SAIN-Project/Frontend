import {
    Component,
    OnInit,
    AfterViewInit,
    Renderer2,
    ElementRef,
    ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToolService } from "../../services/tool.service";
import { ReteService } from "../../services/rete.service";
import { DatasetService } from "../../services/dataset.service";
import { RendererService } from "../../services/renderer.service";
import { FileDownloadUploadService } from "../../services/file-download-upload.service";
import { RoutingService } from "../../services/routing.service";
import { ToolComponent } from "../../classes/tool";
import { ReteComponent } from "../../classes/component";
import { Categories as Category } from "../../classes/sharedclasses";

@Component({
    selector: "app-tool-datails",
    templateUrl: "./component-details.component.html",
    styleUrls: ["./tool-datails.component.scss"],
})
export class ComponentDatails implements OnInit {
    Component: ToolComponent = new ToolComponent();
    Rete: any[] = [];
    Component_id;
    view = "details";
    Datasets: any = [];
    ReteComponentName: string;
    Field: string;
    TargetTags: string[] = [];
    @ViewChild("el", { static: true }) el: ElementRef;
    SourceCategories: Category[] = [];

    constructor(
        private toolservice: ToolService,
        private Activerouter: ActivatedRoute,
        private router: RoutingService,
        private downloader: FileDownloadUploadService,
        private rete: ReteService,
        private dataservice: DatasetService,
        private renderer: RendererService
    ) {}
    async ngOnInit() {
        this.Component_id = await this.Activerouter.snapshot.params["id"];
        this.getComponent();
        this.setSources();
        this.getReteComponents();
    }
    async getComponent() {
        this.toolservice
            .getToolComponentById(this.Component_id)
            .subscribe((response) => {
                this.Component.fromJson(response);
                var data = this.renderer.parseCkEditorContents(
                    this.Component.contents
                );
                this.renderer.renderContents(this.el, data);
            });
    }
    setSources() {
        this.toolservice.getToolComponentById(this.Component_id).subscribe(
            (response) => {
                this.SourceCategories = response.categories;
            },
            (error) => {
                console.log("Unable To fetch the tool");
            }
        );
    }
    updateContent($event) {}
    async getReteComponents() {
        this.rete.getComponentRete(this.Component_id).subscribe((response) => {
            for (var item of <Array<any>>response) {
                var component = JSON.parse(item.contents);
                component.Inputs = component.Inputs.filter(
                    (input) => input.control == "FileControl"
                );

                for (var input of component.Inputs) {
                    input.SourceTags = JSON.stringify(input.Tags);
                    input.SourceTags = JSON.parse(input.SourceTags);
                    input.SourceCategories = [
                        { key: input.Name, values: input.SourceTags },
                    ];
                    var categories: Category = new Category();
                    categories.fromJson([
                        { key: input.Name, values: input.Tags },
                    ]);
                    input.Categories = categories;
                }
                this.Rete.push(component);
            }
        });
    }
    filterDataset(input) {
        this.view = "list";
        this.ReteComponentName = input.ComponentName;
        this.Field = input.Name;
        this.Datasets = [];
        var Tags: any[] = input.Tags;
        if (input.Categories.CategoriesList.length) {
            Tags = input.Categories.CategoriesList[0].values;
        }
        this.TargetTags = Tags;
        var data = new FormData();
        data.append("name", "");
        data.append("categories", new Category().toJsonString());
        data.append("tags", JSON.stringify(Tags));
        this.dataservice.getFilteredData(data).subscribe(
            (response) => {
                this.Datasets = response;
            },
            (error) => {
                console.log(error);
            }
        );
    }
    navigateTo(id: string) {
        this.view = "details";
        this.router.navigateTo("/dataset/details/" + id);
    }
}
