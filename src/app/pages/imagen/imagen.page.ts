import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-imagen",
  templateUrl: "./imagen.page.html",
  styleUrls: ["./imagen.page.scss"],
})
export class ImagenPage implements OnInit {
  public img: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.queryParams) {
        this.img = params.factura;
      }
    });
  }
}
