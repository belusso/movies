import { TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
    }).compileComponents();
  });

  it('should create the Dashboard', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should return StudiosWithWinCount from API', async () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const dashboard = fixture.componentInstance;
    await dashboard.loadStudiosWithWinCount()
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(dashboard.studiosWithWinCount.data.length > 0).toBeTruthy();
  });

  it('should return WinIntervalForProducers - MIN from API', async () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const dashboard = fixture.componentInstance;
    await dashboard.loadWinIntervalForProducers()
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(dashboard.winIntervalForProducers.min.length > 0).toBeTruthy();
  });

  it('should return WinIntervalForProducers - MAX from API', async () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const dashboard = fixture.componentInstance;
    await dashboard.loadWinIntervalForProducers()
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(dashboard.winIntervalForProducers.max.length > 0).toBeTruthy();
  });

  it('should return YearsMoviesWinnerByYear from API - NO YEAR', async () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const dashboard = fixture.componentInstance;
    await dashboard.loadYearsMoviesWinnerByYear()
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(dashboard.yearsMoviesWinnerByYear.data.length == 0).toBeTruthy();
  });

  it('should return YearsMoviesWinnerByYear from API', async () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const dashboard = fixture.componentInstance;
    dashboard.yearsMoviesWinnerByYear.filter = 2008
    await dashboard.loadYearsMoviesWinnerByYear()
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(dashboard.yearsMoviesWinnerByYear.data.length > 0).toBeTruthy();
  });

  it('should return YearsWithMultipleWinners from API', async () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const dashboard = fixture.componentInstance;
    await dashboard.loadYearsWithMultipleWinners()
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(dashboard.yearsWithMultipleWinners.data.length > 0).toBeTruthy();
  });
});
