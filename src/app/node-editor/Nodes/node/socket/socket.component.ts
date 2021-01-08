import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { Socket, IO, Input as ReteInput } from "rete";
import { SocketType } from "rete-angular-render-plugin";

@Component({
    selector: "app-socket",
    templateUrl: "./socket.component.html",
    styleUrls: ["./socket.component.sass"],
})
export class SocketComponent {
    @Input() socket!: Socket;
    @Input() io!: IO;

    get type(): SocketType {
        return this.io instanceof ReteInput ? "input" : "output";
    }
}
