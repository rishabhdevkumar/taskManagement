import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class ProjectPage implements OnInit {

  projectName: string = ''; 
  cards: { title: string; content: string }[] = [];


  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.projectName = params['name'] || 'Business Project'; 
      this.cards = this.projectCards[this.projectName] || []; 
    });
  }

  projectCards: { [key: string]: { title: string; content: string }[] } = {
    'Business Project': [
      { title: 'Business Card 1', content: 'Details for Business Card 1' }
      // { title: 'Business Card 2', content: 'Details for Business Card 2' }
    ],
    'Development Project': [
      { title: 'Dev Card 1', content: 'Details for Development Card 1' },
      { title: 'Dev Card 2', content: 'Details for Development Card 2' }
    ],


}
}