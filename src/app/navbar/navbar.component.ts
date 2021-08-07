import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public menuItems: String[] = [ "Inserir", "Listar", "Alterar", "Excluir" ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  navigate(destino: any) {
    this.router.navigateByUrl(destino);
  }

}
