import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';

export interface Tile {
  cols: number;
  rows: number;
  text: string;
  image: string;
}


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [MatGridListModule, CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})


export class CategoriesComponent {
  constructor(private router: Router) {}
  tiles: Tile[] = [
    { 
      text: `Women's Fashion`,
      cols: 1,
      rows: 4,
      image: '../../../../assets/womens-fashion.png',
     
    },
    {
      text: `Men's Fashion`,
      cols: 1,
      rows: 4,
      image: '../../../../assets/mens-fashion.png',
      
    },
    {
      text: 'Jewelery',
      cols: 1,
      rows: 4,
      image: '../../../../assets/jewelry.png',
    },
    {
      text: 'Electronics',
      cols: 1,
      rows: 4,
      image: '../../../../assets/electronics.png',
    },
  ];


  onNavigateCategory() {
    this.router.navigate(['/products']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
