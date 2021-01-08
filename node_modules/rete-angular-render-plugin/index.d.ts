import { Type } from '@angular/core';
import { NodeEditor } from 'rete';
declare function install(editor: NodeEditor, params?: {
    component?: Type<any>;
}): void;
export declare const AngularRenderPlugin: {
    name: string;
    install: typeof install;
};
export { ReteModule } from './module';
export * from './types';
export { NodeService } from './node.service';
export { NodeComponent } from './node/node.component';
export { SocketComponent } from './socket/socket.component';
