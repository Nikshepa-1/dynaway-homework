import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'
import { HomePage } from './home.page'
import { AssetService } from '../shared/services/asset.service'
import { By } from '@angular/platform-browser'
import { of, throwError } from 'rxjs'
import Spy = jasmine.Spy
import { Asset } from '../shared/models/asset.model'
import { mockAssetHttpResponse } from '../shared/services/asset.test'
import { AssetCardComponent } from './asset-card/asset-card.component'
import { error } from 'console'

describe('HomePage', () => {
  let component: HomePage
  let fixture: ComponentFixture<HomePage>
  let assetSpy: Spy

  beforeEach(waitForAsync(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePage, AssetCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents()

    fixture = TestBed.createComponent(HomePage)
    component = fixture.componentInstance
    fixture.detectChanges()
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have title', () => {
    let header = fixture.debugElement.query(By.css('ion-header')).nativeElement
    expect(header).toBeTruthy();
  });

  it('should call asset service', () => {
    assetSpy = spyOn(TestBed.inject(AssetService), 'getAll').and.returnValue(of(''));
    component.ionViewWillEnter();
    fixture.detectChanges()
    expect(assetSpy).toHaveBeenCalled();
  });

  it('should call asset service -  case 1 - Response Received', () => {
    assetSpy = spyOn(TestBed.inject(AssetService), 'getAll').and.returnValue(of(mockAssetHttpResponse));
    component.ionViewWillEnter();
    fixture.detectChanges()
    expect(assetSpy).toHaveBeenCalled();
    expect(component.assets).toBeTruthy();
  });

  it('should call asset service -  case 2 - Error Received', () => {
    assetSpy = spyOn(TestBed.inject(AssetService), 'getAll').and.returnValue(of(throwError('Http Error')));
    component.ionViewWillEnter();
    fixture.detectChanges()
    expect(assetSpy).toHaveBeenCalled();
    expect(component.assets).toBeFalsy();
  });

  
  it('should spy on setOpen method', () => {
    spyOn(component, 'setOpen');
    component.setOpen(true);
    fixture.detectChanges();
    expect(component.setOpen).toHaveBeenCalledWith(true);
  });
})
