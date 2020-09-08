/**
 * 表头结构
 */
export interface GKTableTitle {
  /** 用于显示在表头单元格中的文本内容 */
  text: string;

  /** 当前表头所在的列当中所取数据的key名 */
  prop: string;
}
