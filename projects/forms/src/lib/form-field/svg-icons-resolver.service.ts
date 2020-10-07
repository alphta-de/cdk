import { SVG_ICONS_MAP } from './tokens';
import { Injectable, ComponentFactoryResolver, ComponentRef, ComponentFactory, ViewContainerRef, Inject } from '@angular/core';

@Injectable()
export class SvgIconsResolverService {
  constructor(
    @Inject(SVG_ICONS_MAP) private iconsMap: any,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  createIcon(iconId: string, containerRef: ViewContainerRef): ComponentRef<any> {
    if (!this.iconsMap[iconId]) {
      throw Error(`Icon ${iconId} has been not provided`);
    }
    const componentFactory: ComponentFactory<any> =
      this.componentFactoryResolver.resolveComponentFactory<any>(this.iconsMap[iconId]);

    const componentRef: ComponentRef<any> = containerRef.createComponent(componentFactory, 0);

    return componentRef;
  }
}
