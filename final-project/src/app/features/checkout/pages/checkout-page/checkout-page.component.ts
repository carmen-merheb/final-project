import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutSummaryComponent } from '../../components/checkout-summary/checkout-summary.component';
import { CheckoutFormComponent } from '../../components/checkout-form/checkout-form.component';
import { CheckoutPaymentComponent } from '../../components/checkout-payment/checkout-payment.component';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
  imports: [CommonModule, CheckoutSummaryComponent, CheckoutFormComponent, CheckoutPaymentComponent]
})
export class CheckoutPageComponent {}
