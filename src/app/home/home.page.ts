import { Component } from '@angular/core'
import { Asset } from '../shared/models/asset.model'
import { AssetService } from '../shared/services/asset.service'
import { error } from 'console'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  assets: Asset[] = []
  showError = false;
  alertButtons = ['Close'];

  constructor(private assetService: AssetService) {}

  ionViewWillEnter(): void {
    this.assets = []
    this.assetService.getAll().subscribe((assets) => {
      this.assets = assets.data
    },
    err => {
      this.setOpen(true)
    });
    }

    setOpen(isOpen: boolean) {
      this.showError = isOpen;
    }
  }
