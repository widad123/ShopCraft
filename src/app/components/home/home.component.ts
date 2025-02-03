import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isHeaderVisible = true;
  lastScrollTop = 0;

  ngOnInit(): void {
    this.observeScroll();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > this.lastScrollTop) {
      this.isHeaderVisible = false;
    } else {
      this.isHeaderVisible = true;
    }
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

    this.observeScroll();
  }

  observeScroll(): void {
    const contentSection = document.querySelector('.content');
    if (contentSection) {
      const rect = contentSection.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        contentSection.classList.add('visible');
      }
    }
  }
}
