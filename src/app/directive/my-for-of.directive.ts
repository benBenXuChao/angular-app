/*
 * @Author: your name
 * @Date: 2020-09-29 13:48:10
 * @LastEditTime: 2020-09-30 11:14:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /angular-app/src/app/directive/my-for-of.directive.ts
 */
import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  Input,
  IterableDiffers,
  IterableDiffer,
  DoCheck,
  EmbeddedViewRef
} from '@angular/core';

@Directive({
  selector: '[appMyFor][appMyForOf]'
})
export class MyForOfDirective implements DoCheck {
  private _items: any;
  private _diffrence: IterableDiffer<any>;
  private map: Map<any, EmbeddedViewRef<any>> = new Map<any, EmbeddedViewRef<any>>();
  @Input() set appMyForOf(items: any) {
    console.log(items);
    this._items = items;
    if (items) {
      this._diffrence =
        this.differs.find(items).create(null);
    }
  }
  constructor(
    private tempalte: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private differs: IterableDiffers,
  ) {
  }
  ngDoCheck(): void {
    if (this._diffrence) {
      const watchChange = this._diffrence.diff(this._items);
      if (watchChange) {
        watchChange.forEachAddedItem(record => {
          const addViewRef = this.viewContainerRef.createEmbeddedView(this.tempalte, {
            $implicit: record.item,
            index: record.currentIndex
          });
          this.map.set(record.item, addViewRef);
        });
        watchChange.forEachRemovedItem(record => {
          this.viewContainerRef.remove(record.currentIndex);
          this.map.delete(record.item);
        });
        watchChange.forEachOperation(record => {
          const currentViewRef = this.viewContainerRef.get(record.currentIndex);
          if (currentViewRef && record.currentIndex !== null) {
            (currentViewRef as EmbeddedViewRef<any>).context.$implicit = record.item;
          }
        });
      }
    }
  }

}