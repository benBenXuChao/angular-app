import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../services/department.service';
import { NzMessageService } from 'ng-zorro-antd';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.less'],
})
export class BaseTableComponent implements OnInit {
  cols = [
    { prop: 'id', label: '部门ID' },
    { prop: 'deptName', label: '部门名称' },
    { prop: 'parentNum', label: '人数' },
  ];

  dataList = [];
  constructor(
    private dept: DepartmentService,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  add(): void {
    this.dept.add().subscribe(() => {
      this.message.success('数据添加成功!');
    });
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
