import { TestBed } from '@angular/core/testing';

import { GKExcelService } from './gkexcel.service';

describe('GKExportExcelService服务测试', () => {
  let service: GKExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GKExcelService],
    });
    service = TestBed.inject(GKExcelService);
  });

  it('服务被正常创建', () => {
    expect(service).toBeTruthy();
  });

  it('toDualityArray方法', () => {
    const originTitles = [
      { text: '表头1', prop: 'tit1' },
      { text: '表头2', prop: 'tit2' },
    ];

    const originData = [
      { tit1: '数据1-1', tit2: '数据1-2' },
      { tit1: '数据2-1', tit2: '数据2-2' },
    ];

    const targetData = [
      ['表头1', '表头2'],
      ['数据1-1', '数据1-2'],
      ['数据2-1', '数据2-2'],
    ];

    expect(service.toDualityArray(originTitles, originData)).toEqual(
      targetData
    );
  });

  it('createXlsx', () => {
    expect(
      service.createXlsx('test', [
        ['1', '2'],
        ['3', '4'],
      ])
    ).toEqual(undefined);

    expect(service.createXlsx('test')).toEqual(undefined);
  });

  it('export', () => {
    const originTitles = [
      { text: '表头1', prop: 'tit1' },
      { text: '表头2', prop: 'tit2' },
    ];

    const originData = [
      { tit1: '数据1-1', tit2: '数据1-2' },
      { tit1: '数据2-1', tit2: '数据2-2' },
    ];
    expect(service.export('test', originTitles, originData)).toEqual(undefined);
  });
});
