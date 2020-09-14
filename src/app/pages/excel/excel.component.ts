import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/services/department.service';
import { NzMessageService } from 'ng-zorro-antd';
import { FormBuilder } from '@angular/forms';
import { GKExcelService } from '@goku/tools';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.less'],
})
export class ExcelComponent implements OnInit {
  cols = [
    { prop: 'id', text: '部门ID' },
    { prop: 'deptName', text: '部门名称' },
    { prop: 'parentNum', text: '人数' },
  ];

  dataList = [];
  constructor(
    private dept: DepartmentService,
    private message: NzMessageService,
    private excel: GKExcelService
  ) {}

  export(): void {
    this.excel.export('demo', this.cols, this.dataList);
  }

  ngOnInit(): void {
    this.dept.list().subscribe(({ data }) => {
      this.dataList = data.list;
    });
  }

  delete(id): void {
    this.dept.remove().subscribe(({ code }) => {
      if (code === 0) {
        this.message.success('删除成功！');
      }
    });
  }
}
