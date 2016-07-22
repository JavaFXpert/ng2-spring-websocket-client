import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import {PLATFORM_DIRECTIVES,provide,Input,Directive,HostBinding} from '@angular/core';
import { AngularWebsocketsDemoAppComponent} from './app/angular-websockets-demo.component';
import { environment } from './app/environment';

if (environment.production) {
  enableProdMode();
}

@Directive({
  selector:'[layout]'
})
export class LayoutDirective{
  @Input() layout:string;
  @HostBinding('style.display') display = 'flex';

  @HostBinding('style.flex-direction')
  get direction(){
    return (this.layout === 'column') ? 'column':'row';
  }
}
@Directive({
  selector:'[flex]'
})
export class FlexDirective{
  @Input() shrink:number = 1;
  @Input() grow:number = 1;
  @Input() flex:string;

  @HostBinding('style.flex')
  get style(){
    return `${this.grow} ${this.shrink} ${this.flex === '' ? '0':this.flex}%`;
  }
}

bootstrap(AngularWebsocketsDemoAppComponent, [
  provide(PLATFORM_DIRECTIVES, { useValue: FlexDirective, multi: true}),
  provide(PLATFORM_DIRECTIVES, { useValue: LayoutDirective, multi: true})
]);
