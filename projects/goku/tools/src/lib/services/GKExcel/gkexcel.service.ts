import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { GKTableTitle } from '../../models/table.model';

type TableData = {
  [keyName: string]: any;
};

/**
 * excel文件服务,提供文件导出函数和相关表格类型数据处理函数
 */
@Injectable({
  providedIn: 'root',
})
export class GKExcelService {
  constructor() {}

  /**
   * 传入以字符串为基本类型的二元数组数据,导出excel表格文件
   * @param name 文件名
   * @param data 需要被写入到excel文件的数据
   * ### 示例:
   * ```typescript
   * export class DemoService {
   *  constructor(private gkXlsx: GKExcelService){}
   *
   *  data = [
   *    ['姓名',年龄],
   *    ['小明',18],
   *    ['李磊',19]
   *  ]
   *
   *  download(){
   *    this.gkXlsx.createXlsx('用户信息', this.data);
   *  }
   * }
   * ```
   */
  createXlsx(fileName: string, data: string[][] = []): void {
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'sheet1');

    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  /**
   * 将数据格式转换成适用于excel的二元数组结构
   * @param titles 表头列表
   * @param data 表格数据本身
   * ### 示例:
   * ```typescript
   * export class DemoService {
   *  constructor(private gkXlsx: GKExcelService){}
   *
   *  titles: GKTableTitle[] = [
   *    { text: '姓名', prop: 'name' },
   *    { text: '年龄', prop: 'age' }
   *  ]
   *
   *  data = [
   *    { name: '小明', age: 18 },
   *    { name: '李磊', age: 19 }
   *  ]
   *
   *  formater(){
   *    let res = this.gkXlsx.toDualityArray(this.titles, this.data);
   *    console.log(res);
   *    // [ ['姓名',年龄], ['小明',18], ['李磊',19] ]
   *  }
   * }
   * ```
   */
  toDualityArray(titles: GKTableTitle[], data: TableData[]): string[][] {
    const tit = titles.map(({ text }) => text);

    const countData: any[][] = data.map((item) =>
      titles.map(({ prop: p }) => item[p])
    );
    countData.unshift(tit);
    return countData;
  }

  /**
   * 将表格数据导出到excel文件当中
   * @param fileName excel文件名,无需后缀
   * @param titles 表头声明
   * @param data 列表数据
   * ### 示例:
   * ```typescript
   * export class DemoService {
   *  constructor(private gkXlsx: GKExcelService){}
   *
   *  titles: GKTableTitle[] = [
   *    { text: '姓名', prop: 'name' },
   *    { text: '年龄', prop: 'age' }
   *  ]
   *
   *  data = [
   *    { name: '小明', age: 18 },
   *    { name: '李磊', age: 19 }
   *  ]
   *
   *  export(){
   *    this.gkXlsx.export('用户信息', this.titles, this.data);
   *  }
   * }
   */
  export(fileName: string, titles: GKTableTitle[], data: TableData[]): void {
    this.createXlsx(fileName, this.toDualityArray(titles, data));
  }
}
