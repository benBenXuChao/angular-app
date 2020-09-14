import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { GKTableTitle } from '../../models/table.model';

type TableData = {
  [keyName: string]: any;
};

@Injectable({
  providedIn: 'root',
})
export class GKExcelService {
  constructor() {}

  /**
   * 下载excel表格文件
   * @param name 文件名
   * @param data 数据
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
   */
  export(fileName: string, titles: GKTableTitle[], data: TableData[]): void {
    this.createXlsx(fileName, this.toDualityArray(titles, data));
  }
}
