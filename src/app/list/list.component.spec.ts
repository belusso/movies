import { TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent],
    }).compileComponents();
  });

  it('should create the List', () => {
    const fixture = TestBed.createComponent(ListComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should return Movies from API', async () => {
    const fixture = TestBed.createComponent(ListComponent);
    const list = fixture.componentInstance;
    await list.loadData()
    // wait 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));
    expect(list.moviesList.length > 0).toBeTruthy();
  });
});
