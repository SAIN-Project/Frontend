import {
    Injectable,
    Renderer2,
    ElementRef,
    RendererFactory2,
} from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class RendererService {
    public renderer: Renderer2;
    constructor(rendererFactory: RendererFactory2) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }
    renderContents(el: ElementRef, contents: string) {
        this.renderer.setProperty(el.nativeElement, "innerHTML", contents);
    }
    parseCkEditorContents(data: string) {
        const regex = /<oembed.+?url="https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"><\/oembed>/g;
        data = data.replace(
            regex,
            '<iframe style="width:100%;height:500px;" src="https://www.youtube.com/embed/$1"></iframe>'
        );
        return data;
    }
}
