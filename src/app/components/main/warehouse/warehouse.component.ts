import { AfterViewInit, Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit,AfterViewInit{

  ngOnInit(): void {
    
  }
  ngAfterViewInit(): void {    
      $("#example1").DataTable();
      $('#example2').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "info": true,
        "autoWidth": false
      });
  }
}
